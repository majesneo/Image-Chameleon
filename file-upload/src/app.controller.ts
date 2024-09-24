import {
  Body,
  Controller,
  Inject,
  InternalServerErrorException,
  ValidationPipe,
} from '@nestjs/common';
import { EventHandler, EventTypes } from 'event-module';
import {
  CorrelationId,
  RabbitMQService,
  ReplyTo,
} from 'shared-rabbitmq-module';
import { IUploadService } from './upload-service.interface';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { UPLOAD_SERVICE } from './constants';
import {
  FileDownloadDto,
  FileDownloadDtoResponse,
  FileUploadDto,
  FileUploadDtoResponse,
} from 'dto';

@Controller()
export class FileUploadController extends RabbitMQService {
  constructor(
    configService: ConfigService,
    reflector: Reflector,
    @Inject(UPLOAD_SERVICE) private readonly uploadService: IUploadService,
  ) {
    super(configService, reflector);
  }

  @EventHandler(EventTypes.FILE_UPLOAD)
  async handleFileUpload(
    @Body(new ValidationPipe()) fileUploadDto: FileUploadDto,
    @ReplyTo() replyTo: string,
    @CorrelationId() correlationId: string,
  ): Promise<FileUploadDtoResponse> {
    try {
      console.log('EventHandler FILE_UPLOAD');
      const { fileName, fileType } = fileUploadDto;
      const { presignedUrl, fileId } =
        await this.uploadService.generatePresignedUrl(fileName, fileType);
      await this.sendToQueue(replyTo, { presignedUrl, fileId }, correlationId);
      return { presignedUrl, fileId };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to generate presigned URL',
        error.message,
      );
    }
  }

  @EventHandler(EventTypes.FILE_DOWNLOAD)
  async handleFileDownload(
    @Body(new ValidationPipe()) fileDownloadDto: FileDownloadDto,
    @ReplyTo() replyTo: string,
    @CorrelationId() correlationId: string,
  ): Promise<FileDownloadDtoResponse> {
    try {
      const { fileId } = fileDownloadDto;
      const { presignedUrlDownload } =
        await this.uploadService.generateDownloadPresignedUrl(fileId);
      await this.sendToQueue(replyTo, { presignedUrlDownload }, correlationId);
      return { presignedUrlDownload };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to generate presigned URL',
        error.message,
      );
    }
  }
}
