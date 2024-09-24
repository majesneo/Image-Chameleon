import { ImageResolutionConversionDto } from 'dto';

export interface IImageResolutionConversionService {
  resolutionConversion(
    imageResolutionConversionDto: ImageResolutionConversionDto,
  ): Promise<string>;
}
