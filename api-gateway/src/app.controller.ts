import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { RabbitMQService } from 'shared-rabbitmq-module';
import { EventTypes } from 'event-module';
import { FileUploadDto } from 'dto';

@Controller()
export class AppController extends RabbitMQService {
  @Post(EventTypes.IMAGE_COMPRESSION)
  async sendEvent(@Body() dto: { message: string }): Promise<void> {
    try {
      console.log('send imageCompression');
      await this.publishToExchange({
        type: EventTypes.IMAGE_COMPRESSION,
        payload: 'test payload imageCompression',
      });
    } catch (error) {
      console.error('Failed to send event:', error);
    }
  }

  @Get(EventTypes.FILE_UPLOAD)
  async fileUpload(@Query(new ValidationPipe()) fileUploadDto: FileUploadDto) {
    try {
      return await this.publishToExchange({
        type: EventTypes.FILE_UPLOAD,
        payload: fileUploadDto,
      });
    } catch (error) {
      console.error('Failed to send event:', error);
    }
  }
}
