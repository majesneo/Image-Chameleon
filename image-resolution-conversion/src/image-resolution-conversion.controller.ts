import {
  Body,
  Controller,
  Inject,
  InternalServerErrorException,
  ValidationPipe,
} from '@nestjs/common';
import { EventTypes } from 'event-module';
import { IMAGE_RESOLUTION_CONVERSION } from './constants';
import { ImageResolutionConversionDto } from 'dto';
import { IImageResolutionConversionService } from './image-resolution-conversion.interface';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class ImageResolutionConversionController {
  constructor(
    @Inject(IMAGE_RESOLUTION_CONVERSION)
    private readonly imageResolutionConversionService: IImageResolutionConversionService,
  ) {}

  @MessagePattern(EventTypes.IMAGE_RESOLUTION_CONVERSION)
  async handleMobile(
    @Body(new ValidationPipe())
    imageResolutionConversionDto: ImageResolutionConversionDto,
  ) {
    try {
      const filesDownloadUrls =
        await this.imageResolutionConversionService.resolutionConversion(
          imageResolutionConversionDto,
        );
      console.log(filesDownloadUrls, 'filesDownloadUrls');
      return filesDownloadUrls;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to ${EventTypes.IMAGE_RESOLUTION_CONVERSION}`,
        error.message,
      );
    }
  }
}
