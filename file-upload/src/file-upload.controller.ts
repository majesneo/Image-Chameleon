import {
  Body,
  Controller,
  Inject,
  InternalServerErrorException,
  ValidationPipe,
} from '@nestjs/common';
import { IUploadService } from './uploadService/upload-service.interface';
import { UPLOAD_SERVICE } from './constants';
import {
  FileDownloadDto,
  FileDownloadDtoResponse,
  FileUploadDto,
  FileUploadDtoResponse,
} from 'dto';
import { MessagePattern } from '@nestjs/microservices';
import { EventTypes } from 'event-module';

@Controller()
export class FileUploadController {
  constructor(
    @Inject(UPLOAD_SERVICE)
    private readonly uploadService: IUploadService,
  ) {}

  @MessagePattern(EventTypes.FILE_UPLOAD)
  async handleFileUpload(
    @Body(new ValidationPipe()) fileUploadDto: FileUploadDto,
  ): Promise<FileUploadDtoResponse> {
    try {
      console.log("@MessagePattern('FILE_UPLOAD')");
      const { fileName, fileType } = fileUploadDto;
      const { presignedUrl, fileId } =
        await this.uploadService.generatePresignedUrl(fileName, fileType);
      console.log(presignedUrl, 'presignedUrl');
      return { presignedUrl, fileId };
    } catch (error) {
      console.error('Error in handleFileUpload:', error);
      throw error;
    }
  }

  @MessagePattern(EventTypes.FILE_DOWNLOAD)
  async handleFileDownload(
    @Body(new ValidationPipe()) fileDownloadDto: FileDownloadDto,
  ): Promise<FileDownloadDtoResponse> {
    try {
      console.log(fileDownloadDto, 'fileDownloadDto FILE_DOWNLOAD');
      const { fileId } = fileDownloadDto;
      const { presignedUrlDownload } =
        await this.uploadService.generateDownloadPresignedUrl(fileId);
      return { presignedUrlDownload };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to generate presigned URL',
        error.message,
      );
    }
  }
}
