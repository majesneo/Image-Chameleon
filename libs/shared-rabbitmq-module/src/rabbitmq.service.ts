import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as amqplib from 'amqplib';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { EventTypes } from 'event-module'; // Импортируем enum EventTypes

interface Event<P> {
  type: EventTypes;
  payload: P;
}

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
  private connection: amqplib.Connection | undefined;
  private channel: amqplib.Channel | undefined;
  private exchange = 'processing_exchange';
  private exchangeType = 'direct';
  private queue = '';

  constructor(
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {}

  async onModuleInit(): Promise<void> {
    if (!this.connection || !this.channel) {
      await this.connect();
      await this.setupConsumer();
    }
  }

  async connect(): Promise<void> {
    const url = this.configService.get<string>('AMWP_URL');
    this.connection = await amqplib.connect(url || '');
    this.channel = await this.connection.createChannel();

    await this.channel.assertExchange(this.exchange, this.exchangeType, {
      durable: true,
    });

    console.log('Connected to RabbitMQ');
  }

  async publishToExchange<P>(event: Event<P>): Promise<void> {
    const message = JSON.stringify(event);
    this.channel?.publish(this.exchange, '', Buffer.from(message));
    console.log(`Message published to exchange ${this.exchange}`);
  }

  async setupConsumer(): Promise<void> {
    const q = await this.channel!.assertQueue(this.queue, {
      durable: true,
    });

    await this.channel!.bindQueue(q.queue, this.exchange, '');

    console.log('Waiting for messages in queue:', q.queue);

    this.channel!.consume(
      q.queue,
      (msg) => {
        if (msg !== null) {
          const content = msg.content.toString();
          const event: Event<any> = JSON.parse(content);
          this.onMessageReceived(event);
          this.channel!.ack(msg);
        }
      },
      { noAck: false },
    );
  }

  onMessageReceived<P>(event: Event<P>): void {
    const prototype = Object.getPrototypeOf(this);

    const allMethods = Object.getOwnPropertyNames(prototype) as (keyof this)[];

    const handlers = allMethods.filter((method) => {
      return this.reflector.get('eventType', this[method as keyof this] as Function);
    });

    for (const handler of handlers) {
      const eventType = this.reflector.get<EventTypes>('eventType', this[handler as keyof this] as Function) as EventTypes | undefined;
      if (eventType === event.type) {
        console.log(`Invoking handler ${handler.toString()} for event type ${event.type}`);
        (this[handler as keyof this] as Function).call(this, event.payload);
        return;
      }
    }
  }

  async closeConnection(): Promise<void> {
    await this.channel?.close();
    await this.connection?.close();
    console.log('RabbitMQ connection closed');
  }

  async onModuleDestroy(): Promise<void> {
    await this.closeConnection();
  }
}
