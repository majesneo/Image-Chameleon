import { Controller } from '@nestjs/common';
import { RabbitMQService } from 'shared-rabbitmq-module';
import { EventHandler, EventTypes } from 'event-module';

@Controller()
export class AppController extends RabbitMQService {
  @EventHandler(EventTypes.IMAGE_RESOLUTION_CONVERSION)
  async handleImageResolutionConversion(message: string): Promise<void> {
    console.log('Handling IMAGE_RESOLUTION_CONVERSION:', message);
  }
}
