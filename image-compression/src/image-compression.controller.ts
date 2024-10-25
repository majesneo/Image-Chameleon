import { Controller } from '@nestjs/common';

@Controller()
export class ImageCompressionController {
  constructor() {}

  //
  // @MessagePattern(EventTypes.IMAGE_COMPRESSION)
  // async handleFileUpload(
  //   @Body(new ValidationPipe()) fileUploadDto: FileUploadDto,
  //   @Ctx() context: RmqContext,
  // ): Promise<FileUploadDtoResponse> {
  //   try {
  //
  //   } catch (error) {
  //     console.error('Error in handleFileUpload:', error);
  //     throw error;
  //   }
  // }
}
