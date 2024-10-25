import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { EventQueue } from 'event-module';
import { ImageResolutionConversionModule } from './image-resolution-conversion.module';

async function bootstrap() {
  try {
    const app = await NestFactory.createMicroservice(
      ImageResolutionConversionModule,
      {
        transport: Transport.RMQ,
        options: {
          urls: [process.env.AMQP_URL || 'amqp://localhost:5672'],
          queue: EventQueue.IMAGE_RESOLUTION_CONVERSION,
          queueOptions: {
            durable: true,
          },
        },
      },
    );

    await app.listen();
    console.log(
      `${ImageResolutionConversionModule.name} Microservice is listening...`,
    );
  } catch (error) {
    console.error(
      `Error in ${ImageResolutionConversionModule.name} Microservice:`,
      error,
    );
  }
}

bootstrap();
