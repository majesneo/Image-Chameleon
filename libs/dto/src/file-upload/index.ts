import { IsNotEmpty, IsString } from 'class-validator';

export class FileUploadDto {
  @IsNotEmpty()
  @IsString()
  fileName: string;

  @IsNotEmpty()
  @IsString()
  fileType: string;
}
