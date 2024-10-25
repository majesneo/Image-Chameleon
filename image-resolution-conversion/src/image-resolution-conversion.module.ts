import { Logger, Module } from '@nestjs/common';
import { ImageResolutionConversionController } from './image-resolution-conversion.controller';
import { ConfigModule } from '@nestjs/config';
import { IMAGE_RESOLUTION_CONVERSION } from './constants';
import { ImageResolutionConversionService } from './image-resolution-conversion.service';
import { ClientProxyFactoryModule } from 'client-proxy-factory';
import { HttpModule } from '@nestjs/axios';
import { ImageFormatStrategyFactory } from './image-format-strategy/image-format-strategy-factory.service';
import { JpegStrategy } from './image-format-strategy/jpeg-strategy';
import { PngStrategy } from './image-format-strategy/png-strategy';
import { SvgStrategy } from './image-format-strategy/svg-strategy';
import { WebpStrategy } from './image-format-strategy/webp-strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env',
    }),
    ClientProxyFactoryModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [ImageResolutionConversionController],
  providers: [
    {
      provide: IMAGE_RESOLUTION_CONVERSION,
      useClass: ImageResolutionConversionService,
    },
    Logger,
    ImageFormatStrategyFactory,
    JpegStrategy,
    PngStrategy,
    SvgStrategy,
    WebpStrategy,
  ],
})
export class ImageResolutionConversionModule {}
