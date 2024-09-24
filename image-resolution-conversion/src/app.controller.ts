import {
  Body,
  Controller,
  Inject,
  InternalServerErrorException,
  ValidationPipe,
} from '@nestjs/common';
import {
  CorrelationId,
  RabbitMQService,
  ReplyTo,
} from 'shared-rabbitmq-module';
import { EventHandler, EventTypes } from 'event-module';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { IMAGE_RESOLUTION_CONVERSION } from './constants';
import { ImageResolutionConversionDto } from 'dto';
import { IImageResolutionConversionService } from './image-resolution-conversion.interface';

@Controller()
export class AppController extends RabbitMQService {
  constructor(
    configService: ConfigService,
    reflector: Reflector,
    @Inject(IMAGE_RESOLUTION_CONVERSION)
    private readonly imageResolutionConversionService: IImageResolutionConversionService,
  ) {
    super(configService, reflector);
  }

  @EventHandler(EventTypes.IMAGE_RESOLUTION_CONVERSION)
  async handleMobile(
    @ReplyTo() replyTo: string,
    @CorrelationId() correlationId: string,
    @Body(new ValidationPipe())
    imageResolutionConversionDto: ImageResolutionConversionDto,
  ) {
    try {
      const mobile = this.imageResolutionConversionService.resolutionConversion(
        imageResolutionConversionDto,
      );
      this.channel?.sendToQueue(
        replyTo,
        Buffer.from(JSON.stringify({ mobile })),
        {
          correlationId: correlationId,
        },
      );
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to ${EventTypes.IMAGE_RESOLUTION_CONVERSION}`,
        error.message,
      );
    }
  }
}
