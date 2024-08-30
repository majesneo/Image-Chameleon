import { Body, Controller, Post } from '@nestjs/common';
import { RabbitMQService } from 'shared-rabbitmq-module';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { EventTypes } from 'event-module';

@Controller()
export class AppController extends RabbitMQService {
  constructor(configService: ConfigService, reflector: Reflector) {
    super(configService, reflector);
  }
  @Post('imageCompression')
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
}
