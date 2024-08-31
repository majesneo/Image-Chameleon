import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const config = app.get<ConfigService>(ConfigService);
    await app.listen(config.get('PORT'), config.get('HOSTNAME'));
    console.log('image-compression started');
  } catch (error) {
    console.error('Error image-compression:', error);
  }
}

bootstrap();
