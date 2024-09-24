import { FileDownloadDtoResponse, FileUploadDtoResponse } from 'dto';

export interface IUploadService {
  generatePresignedUrl(
    fileName: string,
    fileType: string,
  ): Promise<FileUploadDtoResponse>;
  generateDownloadPresignedUrl(
    fileId: string,
  ): Promise<FileDownloadDtoResponse>;
}
