import { Body, Controller, Inject, InternalServerErrorException, ValidationPipe } from '@nestjs/common';
import { EventHandler, EventTypes } from 'event-module';
import { CorrelationId, RabbitMQService, ReplyTo } from 'shared-rabbitmq-module';
import { IUploadService } from './upload-service.interface';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { UPLOAD_SERVICE } from './constants';
import { FileUploadDto } from 'dto';

@Controller()
export class FileUploadController extends RabbitMQService {
  constructor(configService: ConfigService, reflector: Reflector, @Inject(UPLOAD_SERVICE) private readonly uploadService: IUploadService,
  ) {
    super(configService, reflector);
  }

  @EventHandler(EventTypes.FILE_UPLOAD)
  async handleFileUpload(@Body(new ValidationPipe()) fileUploadDto: FileUploadDto, @ReplyTo() replyTo: string,
                         @CorrelationId() correlationId: string): Promise<void> {
    try {
      const { fileName, fileType } = fileUploadDto;
      const presignedUrl = await this.uploadService.generatePresignedUrl(fileName, fileType);


      this.channel?.sendToQueue(replyTo, Buffer.from(presignedUrl), {
        correlationId: correlationId,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to generate presigned URL', error.message);
    }
  }
}
