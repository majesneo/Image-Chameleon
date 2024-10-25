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

export enum ImageFormat {
  JPEG = "jpeg",
  JPG = "jpg",
  PNG = "png",
  WEBP = "webp",
  SVG = "svg",
}

export const MIME_TYPES: Record<ImageFormat, string> = {
  [ImageFormat.JPEG]: "image/jpeg",
  [ImageFormat.JPG]: "image/jpeg",
  [ImageFormat.PNG]: "image/png",
  [ImageFormat.WEBP]: "image/webp",
  [ImageFormat.SVG]: "image/svg+xml",
};
