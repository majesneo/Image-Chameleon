import { ImageResolutionConversionDto } from 'dto';

export interface IImageResolutionConversionService {
  resolutionConversion(
    imageResolutionConversionDto: ImageResolutionConversionDto,
  ): Promise<string[]>;
}

export interface ImageDataI {
  buffer: Buffer;
  format: string;
}

export enum ImageFormat {
  jpeg = 'jpeg',
  jpg = 'jpg',
  png = 'png',
  webp = 'webp',
}
