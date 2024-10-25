// src/image-resolution-conversion/image-resolution-conversion.service.ts

import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  IImageResolutionConversionService,
  ImageDataI,
} from './image-resolution-conversion.interface';
import {
  FileDownloadDto,
  FileDownloadDtoResponse,
  FileUploadDto,
  FileUploadDtoResponse,
  ImageFormat,
  ImageResolutionConversionDto,
  MIME_TYPES,
  ResolutionOptionsDto,
} from 'dto';
import { EventQueue, EventTypes } from 'event-module';
import { CLIENT_PROXY, ClientProxySendEventI } from 'client-proxy-factory';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';
import sharp from 'sharp';
import { ImageFormatStrategy } from './image-format-strategy/image-format-strategy.interface';
import { ImageFormatStrategyFactory } from './image-format-strategy/image-format-strategy-factory.service';

@Injectable()
export class ImageResolutionConversionService
  implements IImageResolutionConversionService
{
  private readonly resolutions: Record<
    keyof ResolutionOptionsDto,
    { width: number; height: number }
  > = {
    mobile: { width: 375, height: 667 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1440, height: 900 },
  };

  constructor(
    @Inject(CLIENT_PROXY)
    private readonly sendEventService: ClientProxySendEventI,
    private readonly httpService: HttpService,
    @Inject(Logger)
    private readonly logger: Logger,
    private readonly formatStrategyFactory: ImageFormatStrategyFactory,
  ) {}

  async getImage(presignedUrlDownload: string): Promise<ImageDataI> {
    try {
      const response: AxiosResponse<ArrayBuffer> = await firstValueFrom(
        this.httpService
          .get(presignedUrlDownload, { responseType: 'arraybuffer' })
          .pipe(
            catchError((error: AxiosError) => {
              this.logger.error(error.response?.data || 'Unknown error');
              throw new Error('An error happened while downloading the image!');
            }),
          ),
      );

      const buffer = Buffer.from(response.data);
      const metadata = await sharp(buffer).metadata();

      if (!metadata.format) {
        throw new Error('Unable to determine image format.');
      }

      return {
        buffer,
        format: metadata.format,
      };
    } catch (error) {
      this.logger.error(`Failed to get image: ${(error as Error).message}`);
      throw error;
    }
  }

  async getDownloadUrlImage(fileDownloadDto: FileDownloadDto): Promise<string> {
    try {
      const { presignedUrlDownload } = await this.sendEventService.sendEvent<
        FileDownloadDto,
        FileDownloadDtoResponse
      >(EventTypes.FILE_DOWNLOAD, EventQueue.FILE, fileDownloadDto);
      return presignedUrlDownload;
    } catch (error) {
      this.logger.error(
        `Failed to get download URL: ${(error as Error).message}`,
      );
      throw new Error('Failed to retrieve download URL.');
    }
  }

  async getPresignedUrl(fileUploadDto: FileUploadDto) {
    try {
      const { presignedUrl } = await this.sendEventService.sendEvent<
        FileUploadDto,
        FileUploadDtoResponse
      >(EventTypes.FILE_UPLOAD, EventQueue.FILE, fileUploadDto);
      return presignedUrl;
    } catch (error) {
      this.logger.error(
        `Failed to get presigned URL for upload: ${(error as Error).message}`,
      );
    }
  }

  async uploadFile(presignedUrlUpload: string, processedBuffer: Buffer, file) {
    const { fileType, newFileName } = file;
    try {
      await firstValueFrom(
        this.httpService
          .put(presignedUrlUpload, processedBuffer, {
            headers: {
              'Content-Type': fileType,
            },
          })
          .pipe(
            catchError((error: AxiosError) => {
              this.logger.error(
                `Failed to upload ${newFileName}: ${error.message}`,
              );
              throw new Error(`Failed to upload ${newFileName}`);
            }),
          ),
      );
      this.logger.log(`Successfully uploaded ${newFileName}`);
    } catch (error) {
      this.logger.error(
        `Error uploading ${newFileName}: ${(error as Error).message}`,
      );
    }
  }

  async resolutionConversion(
    imageResolutionConversionDto: ImageResolutionConversionDto,
  ): Promise<string[]> {
    const { options, originalFileName, fileId } = imageResolutionConversionDto;
    const fileDownloadDto: FileDownloadDto = { fileId };
    const downloadUrlImage = await this.getDownloadUrlImage(fileDownloadDto);
    const { buffer, format } = await this.getImage(downloadUrlImage);
    const filesProcessedSharp: Buffer[] = [];
    const filesDownloadUrls: string[] = [];

    let formatStrategy: ImageFormatStrategy;
    try {
      formatStrategy = this.formatStrategyFactory.getStrategy(format);
    } catch (error) {
      this.logger.error((error as Error).message);
      throw error;
    }

    const resolutionEntries = Object.entries(options).filter(([, v]) => v);
    const processingPromises = resolutionEntries.map(async ([key]) => {
      const { width, height } =
        this.resolutions[key as keyof ResolutionOptionsDto];
      try {
        const processedBuffer = await formatStrategy.process(
          buffer,
          width,
          height,
        );
        filesProcessedSharp.push(processedBuffer);
        this.logger.log(`Processed ${key} resolution.`);
      } catch (error) {
        this.logger.error(
          `Failed to process ${key} resolution: ${(error as Error).message}`,
        );
      }
    });

    await Promise.all(processingPromises);

    this.logger.log(`Total processed files: ${filesProcessedSharp.length}`);

    const uploadPromises = filesProcessedSharp.map(
      async (processedBuffer, index) => {
        const resolutionKey = resolutionEntries[index][0];
        const fileExtension = format.toLowerCase() as ImageFormat;
        const baseName = originalFileName
          ? originalFileName.replace(/\.[^/.]+$/, '') // Remove extension
          : `processed_image_${Date.now()}`;
        const newFileName = `${baseName}_${resolutionKey}.${fileExtension}`;

        const fileType =
          MIME_TYPES[fileExtension] ||
          ('application/octet-stream' as ImageFormat);

        const presignedUrlUpload = await this.getPresignedUrl({
          fileName: newFileName,
          fileType: fileType,
          fileId: fileId,
        });

        await this.uploadFile(presignedUrlUpload, processedBuffer, {
          fileName: newFileName,
          fileType: fileType,
        });

        const fileDownloadDto = { fileId };
        const downloadUrlImage =
          await this.getDownloadUrlImage(fileDownloadDto);
        filesDownloadUrls.push(downloadUrlImage);

        return processedBuffer;
      },
    );

    await Promise.all(uploadPromises);

    this.logger.log(`All processed files have been uploaded.`);
    console.log(filesDownloadUrls, 'filesDownloadUrls');
    return filesDownloadUrls;
  }
}
