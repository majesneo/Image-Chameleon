import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as amqplib from 'amqplib';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
  private connection: amqplib.Connection | undefined;
  private channel: amqplib.Channel | undefined;
  private exchange = 'processing_exchange';
  private exchangeType = 'fanout';

  constructor(private readonly configService: ConfigService) {
  }

  async onModuleInit() {
    await this.connect();
  }

  async connect() {
    const url = this.configService.get<string>('AMWP_URL');
    this.connection = await amqplib.connect(url || '');
    this.channel = await this.connection.createChannel();

    await this.channel.assertExchange(this.exchange, this.exchangeType, {
      durable: true,
    });

    console.log('Connected to RabbitMQ');
  }

  async publishToExchange(message: string) {
    this.channel?.publish(this.exchange, '', Buffer.from(message));
    console.log(`Message published to exchange ${this.exchange}`);
  }

  async closeConnection() {
    await this.channel?.close();
    await this.connection?.close();
    console.log('RabbitMQ connection closed');
  }

  async onModuleDestroy() {
    await this.closeConnection();
  }
}

module.exports = {
  RabbitMQService,
};
