import { Module } from '@nestjs/common';
import { FileUploadController } from './app.controller';
import { UploadService } from './app.service';
import { SharedRabbitMQModule } from 'shared-rabbitmq-module';
import { ConfigModule } from '@nestjs/config';
import { UPLOAD_SERVICE } from './constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env',
    }),

  ],
  controllers: [FileUploadController],
  providers: [SharedRabbitMQModule,  {
    provide: UPLOAD_SERVICE,
    useClass: UploadService,
  },],
})
export class FileUploadModule {
}
