import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import {
  FileUploadDto,
  FileUploadDtoResponse,
  ImageResolutionConversionDto,
} from 'dto';
import { EventQueue, EventTypes } from 'event-module';
import { CLIENT_PROXY, ClientProxySendEventI } from 'client-proxy-factory';

@Controller()
export class ApiGatewayController {
  constructor(
    @Inject(CLIENT_PROXY)
    private readonly sendEventService: ClientProxySendEventI,
  ) {}

  @Get(EventTypes.FILE_UPLOAD)
  async fileUpload(@Query() fileUploadDto: FileUploadDto) {
    try {
      console.log(fileUploadDto, 'fileUploadDto');
      console.log('Publishing FILE_UPLOAD event');
      return await this.sendEventService.sendEvent<
        FileUploadDto,
        FileUploadDtoResponse
      >(EventTypes.FILE_UPLOAD, EventQueue.FILE, fileUploadDto);
    } catch (error) {
      console.error('Failed to send FILE_UPLOAD event:', error);
      throw error;
    }
  }

  @Post(EventTypes.IMAGE_RESOLUTION_CONVERSION)
  async sendEvent(
    @Body() imageResolutionConversionDto: ImageResolutionConversionDto,
  ): Promise<string[]> {
    try {
      console.log('send imageCompression');
      return await this.sendEventService.sendEvent<
        ImageResolutionConversionDto,
        string[]
      >(
        EventTypes.IMAGE_RESOLUTION_CONVERSION,
        EventQueue.IMAGE_RESOLUTION_CONVERSION,
        imageResolutionConversionDto,
      );
    } catch (error) {
      console.error('Failed to send event:', error);
    }
  }
}
