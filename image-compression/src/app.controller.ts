import { Controller } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { EventHandler, EventTypes } from 'event-module';
import { RabbitMQService } from 'shared-rabbitmq-module';

@Controller()
export class AppController extends RabbitMQService {
  constructor(configService: ConfigService, reflector: Reflector) {
    super(configService, reflector);
  }

  @EventHandler(EventTypes.IMAGE_COMPRESSION)
  async handleImageCompression(message: string): Promise<void> {
    console.log('Handling IMAGE_COMPRESSION:', message);
  }
}
