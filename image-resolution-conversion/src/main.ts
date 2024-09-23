import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const config = app.get<ConfigService>(ConfigService);
    app.enableCors({
      origin: 'http://localhost:3000',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    });
    await app.listen(config.get('PORT'), config.get('HOSTNAME'));
    console.log(
      `image-resolution-conversion started on port ${config.get('PORT')}`,
    );
  } catch (error) {
    console.error('Error image-resolution-conversion:', error);
  }
}

bootstrap();
