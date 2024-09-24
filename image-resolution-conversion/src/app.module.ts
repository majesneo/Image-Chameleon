import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ImageResolutionConversionService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SharedRabbitMQModule } from 'shared-rabbitmq-module';
import { IMAGE_RESOLUTION_CONVERSION } from './constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env',
    }),
  ],
  controllers: [AppController],
  providers: [
    SharedRabbitMQModule,
    {
      provide: IMAGE_RESOLUTION_CONVERSION,
      useClass: ImageResolutionConversionService,
    },
  ],
})
export class AppModule {}
