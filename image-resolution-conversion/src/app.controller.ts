import { Controller } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { RabbitMQService } from 'shared-rabbitmq-module';
import { EventHandler, EventTypes } from 'event-module';

@Controller()
export class AppController extends RabbitMQService {
  constructor(configService: ConfigService, reflector: Reflector) {
    super(configService, reflector);
  }

  @EventHandler(EventTypes.IMAGE_RESOLUTION_CONVERSION)
  async handleImageResolutionConversion(message: string): Promise<void> {
    console.log('Handling IMAGE_RESOLUTION_CONVERSION:', message);
  }
}
