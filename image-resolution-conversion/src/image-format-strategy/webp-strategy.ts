import { Injectable, Logger } from '@nestjs/common';
import sharp from 'sharp';
import { ImageFormatStrategy } from './image-format-strategy.interface';

@Injectable()
export class WebpStrategy implements ImageFormatStrategy {
  constructor(private readonly logger: Logger) {}
  async process(
    buffer: Buffer,
    width: number,
    height: number,
  ): Promise<Buffer> {
    try {
      const processedBuffer = await sharp(buffer)
        .resize(width, height, { fit: 'inside' })
        .webp({ quality: 100 })
        .toBuffer();
      this.logger.log('Webp image processed successfully.');
      return processedBuffer;
    } catch (error) {
      this.logger.error(`Failed to process Webp: ${(error as Error).message}`);
      throw error;
    }
  }
}
