export interface ImageFormatStrategy {
  process(buffer: Buffer, width: number, height: number): Promise<Buffer>;
}
