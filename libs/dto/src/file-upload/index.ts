import { IsNotEmpty, IsString } from "class-validator";

export class FileUploadDto {
  @IsNotEmpty()
  @IsString()
  fileName: string;

  @IsNotEmpty()
  @IsString()
  fileType: string;
}

export class FileUploadDtoResponse {
  @IsNotEmpty()
  @IsString()
  presignedUrl: string;

  @IsNotEmpty()
  @IsString()
  fileId: string;
}

export class FileDownloadDto {
  @IsNotEmpty()
  @IsString()
  fileId: string;
}

export class FileDownloadDtoResponse {
  @IsNotEmpty()
  @IsString()
  presignedUrlDownload: string;
}
