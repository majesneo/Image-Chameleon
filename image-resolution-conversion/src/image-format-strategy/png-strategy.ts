// src/image-strategies/png-strategy.ts

import { Injectable, Logger } from '@nestjs/common';
import sharp from 'sharp';
import { ImageFormatStrategy } from './image-format-strategy.interface';
import { PassThrough, pipeline } from 'stream';
import { promisify } from 'util';

const pipelineAsync = promisify(pipeline);

@Injectable()
export class PngStrategy implements ImageFormatStrategy {
  constructor(private readonly logger: Logger) {}

  async process(
    buffer: Buffer,
    width: number,
    height: number,
  ): Promise<Buffer> {
    try {
      const readStream = sharp(buffer);
      const transformer = sharp()
        .resize(width, height, { fit: 'inside' })
        .png({ compressionLevel: 9, palette: true, adaptiveFiltering: true });

      const outputStream = new PassThrough();
      const chunks: Buffer[] = [];

      await pipelineAsync(
        readStream,
        transformer,
        outputStream
          .on('data', (chunk) => chunks.push(chunk))
          .on('end', () => {
            this.logger.log('PNG image processed successfully.');
          }),
      );

      return Buffer.concat(chunks);
    } catch (error) {
      this.logger.error(`Failed to process PNG: ${(error as Error).message}`);
      throw error;
    }
  }
}
