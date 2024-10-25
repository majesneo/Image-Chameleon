import { Module } from '@nestjs/common';
import { UploadService } from './uploadService/upload.service';
import { ConfigModule } from '@nestjs/config';
import { UPLOAD_SERVICE } from './constants';
import { FileUploadController } from './file-upload.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env',
    }),
  ],
  controllers: [FileUploadController],
  providers: [
    {
      provide: UPLOAD_SERVICE,
      useClass: UploadService,
    },
  ],
})
export class FileUploadModule {}
