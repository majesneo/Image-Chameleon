import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { PutObjectCommand, S3Client, S3ServiceException } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { IUploadService } from './upload-service.interface';

@Injectable()
export class UploadService implements IUploadService {
  private readonly s3: S3Client;
  private readonly logger = new Logger(UploadService.name);
  private readonly maxFileSizeMB = 10 * 1024 * 1024;
  private readonly allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/svg+xml',
    'image/gif',
    'image/webp'
  ];
  
  constructor() {
    try {
      this.s3 = new S3Client({
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
        },
        region: process.env.AWS_REGION || '',
      });

      if (
        !process.env.AWS_ACCESS_KEY_ID ||
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

  async generatePresignedUrl(fileName: string, fileType: string): Promise<string> {
    try {
      const bucketName = process.env.AWS_S3_BUCKET_NAME || '';

      if (!bucketName) {
        this.logger.error('Missing AWS S3 bucket name');
        throw new Error('Missing AWS S3 bucket name');
      }

      if (!this.allowedMimeTypes.includes(fileType)) {
        this.logger.error(`Unsupported file type: ${fileType}`);
        throw new BadRequestException('Unsupported file type')
      }


      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: `${Date.now().toString()}-${fileName}`,
        ContentType: fileType,
        ContentLength: this.maxFileSizeMB,
      });

      this.logger.log(`Generating presigned URL for file: ${fileName}, type: ${fileType}`);

      const presignedUrl = await getSignedUrl(this.s3, command, { expiresIn: 3600 });

      this.logger.log(`Presigned URL generated successfully: ${presignedUrl}`);

      return presignedUrl;
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
}
