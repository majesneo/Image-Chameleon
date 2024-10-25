import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { EventQueue } from 'event-module';
import { ImageCompressionModule } from './image-compression.module';

async function bootstrap() {
  try {
    const app = await NestFactory.createMicroservice(ImageCompressionModule, {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.AMQP_URL || 'amqp://localhost:5672'],
        queue: EventQueue.IMAGE_COMPRESSION,
        queueOptions: {
          durable: true,
        },
      },
    });

    await app.listen();
    console.log(`${ImageCompressionModule.name} Microservice is listening...`);
  } catch (error) {
    console.error(
      `Error in ${ImageCompressionModule.name} Microservice:`,
      error,
    );
  }
}

bootstrap();
