// src/image-strategies/svg-strategy.ts
import { Injectable, Logger } from '@nestjs/common';
import { ImageFormatStrategy } from './image-format-strategy.interface';
import { Builder, parseStringPromise } from 'xml2js';

@Injectable()
export class SvgStrategy implements ImageFormatStrategy {
  constructor(private readonly logger: Logger) {}
  async process(
    buffer: Buffer,
    width: number,
    height: number,
  ): Promise<Buffer> {
    try {
      const svgContent = buffer.toString('utf-8');
      const parsedSvg = await parseStringPromise(svgContent);

      if (!parsedSvg.svg) {
        throw new Error('Invalid SVG format: Missing <svg> root element.');
      }

      parsedSvg.svg.$.width = width.toString();
      parsedSvg.svg.$.height = height.toString();

      const builder = new Builder();
      const modifiedSvg = builder.buildObject(parsedSvg);

      return Buffer.from(modifiedSvg, 'utf-8');
    } catch (error) {
      this.logger.error(`Failed to process SVG: ${(error as Error).message}`);
      throw error;
    }
  }
}
