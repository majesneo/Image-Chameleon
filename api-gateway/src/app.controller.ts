import { Body, Controller, Post } from '@nestjs/common';
import * as console from 'node:console';
import { RabbitMQService } from 'shared-rabbitmq-module';

@Controller()
export class AppController {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  @Post('resolutionGateway')
  async resolutionGateway(@Body() dto: { message: string }): Promise<void> {
    try {
      await this.rabbitMQService.publishToExchange(dto.message);
    } catch (error) {
      console.error('Failed to publish message:', error);
    }
  }
}
