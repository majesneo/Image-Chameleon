export interface IUploadService {
  generatePresignedUrl(fileName: string, fileType: string): Promise<string>;
}
