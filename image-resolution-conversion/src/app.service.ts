import { Injectable } from '@nestjs/common';
import { IImageResolutionConversionService } from './image-resolution-conversion.interface';
import { ImageResolutionConversionDto, ResolutionOptionsDto } from 'dto';

@Injectable()
export class ImageResolutionConversionService
  implements IImageResolutionConversionService
{
  private readonly resolutions: Record<
    keyof ResolutionOptionsDto,
    { width: number; height: number }
  > = {
    mobile: { width: 375, height: 667 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1440, height: 900 },
  };

  resolutionConversion(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    imageResolutionConversionDto: ImageResolutionConversionDto,
  ): Promise<string> {
    return Promise.resolve('');
  }
}
