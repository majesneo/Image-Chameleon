import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
  S3ServiceException,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { IUploadService } from './upload-service.interface';
import { FileDownloadDtoResponse, FileUploadDtoResponse } from 'dto';

@Injectable()
export class UploadService implements IUploadService {
  private bucketName = process.env.AWS_S3_BUCKET_NAME || '';
  private readonly s3: S3Client;
  private readonly logger = new Logger(UploadService.name);
  private readonly allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/svg+xml',
    'image/gif',
    'image/webp',
  ];

  constructor() {
    try {
      this.s3 = new S3Client({
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY || '',
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
        },
        region: process.env.AWS_REGION || '',
      });

      if (
        !process.env.AWS_ACCESS_KEY ||
        !process.env.AWS_SECRET_ACCESS_KEY ||
        !process.env.AWS_REGION
      ) {
        throw new Error('Missing AWS credentials or region configuration');
      }
    } catch (error) {
      this.logger.error('Failed to initialize S3 client', error.stack);
      throw new InternalServerErrorException(
        'Failed to initialize S3 client',
        error.message,
      );
    }
  }

  private generateFileId(fileName: string) {
    return `${Date.now().toString()}-${fileName}`;
  }

  async generatePresignedUrl(
    fileName: string,
    fileType: string,
  ): Promise<FileUploadDtoResponse> {
    try {
      this.checkRules(fileType);
      const generatedFileId = this.generateFileId(fileName);
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: generatedFileId,
        ContentType: fileType,
      });

      const presignedUrl = await getSignedUrl(this.s3, command, {
        expiresIn: 3600,
      });

      return { presignedUrl, fileId: generatedFileId };
    } catch (error) {
      this.logger.error('Error during presigned URL generation', error.stack);

      if (error instanceof S3ServiceException) {
        throw new InternalServerErrorException(
          'Error generating presigned URL',
          error.message,
        );
      }
      throw new InternalServerErrorException(
        'Unknown error during presigned URL generation',
        error.message,
      );
    }
  }

  async generateDownloadPresignedUrl(
    fileId: string,
  ): Promise<FileDownloadDtoResponse> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: fileId,
      });

      const presignedUrlDownload = await getSignedUrl(this.s3, command, {
        expiresIn: 3600,
      });

      return { presignedUrlDownload };
    } catch (error) {
      this.logger.error(
        'Error during presigned URL generation for download',
        error.stack,
      );

      if (error instanceof S3ServiceException) {
        throw new InternalServerErrorException(
          'Error generating presigned URL for download',
          error.message,
        );
      }
      throw new InternalServerErrorException(
        'Unknown error during presigned URL generation for download',
        error.message,
      );
    }
  }

  private checkRules(fileType: string) {
    if (!this.allowedMimeTypes.includes(fileType)) {
      this.logger.error(`Unsupported file type: ${fileType}`);
      throw new BadRequestException('Unsupported file type');
    }
  }
}
