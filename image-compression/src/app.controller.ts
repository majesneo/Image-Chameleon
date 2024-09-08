import { Controller } from '@nestjs/common';
import { EventHandler, EventTypes } from 'event-module';
import { RabbitMQService } from 'shared-rabbitmq-module';

@Controller()
export class AppController extends RabbitMQService {
  @EventHandler(EventTypes.IMAGE_COMPRESSION)
  async handleImageCompression(message: string): Promise<void> {
    console.log('Handling IMAGE_COMPRESSION:', message);
  }
}
