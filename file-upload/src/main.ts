import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { FileUploadModule } from './file-upload.module';
import { EventQueue } from 'event-module';

async function bootstrap() {
  try {
    const app = await NestFactory.createMicroservice(FileUploadModule, {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.AMQP_URL || 'amqp://localhost:5672'],
        queue: EventQueue.FILE,
        queueOptions: {
          durable: true,
        },
      },
    });

    await app.listen();
    console.log(`${FileUploadModule.name} Microservice is listening...`);
    console.log(process.env.AMQP_URL, 'process.env.AMQP_URL');
  } catch (error) {
    console.error(`Error in ${FileUploadModule.name} Microservice:`, error);
  }
}

bootstrap();
