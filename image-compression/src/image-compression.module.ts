import { Module } from '@nestjs/common';
import { ImageCompressionService } from './image-compression.service';
import { ConfigModule } from '@nestjs/config';
import { ImageCompressionController } from './image-compression.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env',
    }),
  ],
  controllers: [ImageCompressionController],
  providers: [ImageCompressionService],
})
export class ImageCompressionModule {}
