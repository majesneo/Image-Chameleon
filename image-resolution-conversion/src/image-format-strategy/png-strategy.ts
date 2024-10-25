// src/image-strategies/png-strategy.ts

import { Injectable, Logger } from '@nestjs/common';
import sharp from 'sharp';
import { ImageFormatStrategy } from './image-format-strategy.interface';

@Injectable()
export class PngStrategy implements ImageFormatStrategy {
  constructor(private readonly logger: Logger) {}
  async process(
    buffer: Buffer,
    width: number,
    height: number,
  ): Promise<Buffer> {
    try {
      const processedBuffer = await sharp(buffer)
        .resize(width, height)
        .png({ compressionLevel: 6 })
        .toBuffer();
      this.logger.log('PNG image processed successfully.');
      return processedBuffer;
    } catch (error) {
      this.logger.error(`Failed to process PNG: ${(error as Error).message}`);
      throw error;
    }
  }
}
