import { Injectable } from '@nestjs/common';
import * as multerS3 from 'multer-s3';
import * as multer from 'multer';
import { S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class UploadService {
  private readonly s3: S3Client;

  constructor() {
    this.s3 = new S3Client({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
      region: process.env.AWS_REGION,
    });
  }

  getMulterS3Uploader() {
    return multer({
      storage: multerS3({
        s3: this.s3,
        bucket: process.env.AWS_S3_BUCKET_NAME,
        acl: 'public-read',
        key: function (req, file, cb) {
          cb(null, `${Date.now().toString()}-${file.originalname}`);
        },
      }),
    });
  }
}
