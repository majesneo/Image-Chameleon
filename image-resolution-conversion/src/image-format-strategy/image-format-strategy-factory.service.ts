import { Injectable } from '@nestjs/common';
import { ImageFormatStrategy } from './image-format-strategy.interface';
import { JpegStrategy } from './jpeg-strategy';
import { PngStrategy } from './png-strategy';
import { WebpStrategy } from './webp-strategy';
import { SvgStrategy } from './svg-strategy';
import { ImageFormat } from 'dto';

@Injectable()
export class ImageFormatStrategyFactory {
  private readonly strategies: Record<string, ImageFormatStrategy>;

  constructor(
    private readonly jpegStrategy: JpegStrategy,
    private readonly pngStrategy: PngStrategy,
    private readonly webpStrategy: WebpStrategy,
    private readonly svgStrategy: SvgStrategy,
  ) {
    this.strategies = {
      [ImageFormat.JPEG]: this.jpegStrategy,
      [ImageFormat.JPG]: this.jpegStrategy,
      [ImageFormat.PNG]: this.pngStrategy,
      [ImageFormat.WEBP]: this.webpStrategy,
      [ImageFormat.SVG]: this.svgStrategy,
    };
  }

  getStrategy(format: string): ImageFormatStrategy {
    const strategy = this.strategies[format.toLowerCase()];
    if (!strategy) {
      throw new Error(`Unsupported image format: ${format}`);
    }
    return strategy;
  }
}
