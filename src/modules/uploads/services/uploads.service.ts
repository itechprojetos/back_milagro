import { Injectable } from '@nestjs/common';

import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { UploadFileDto } from '../dto/upload-file.dto';

@Injectable()
export class UploadsService {
  async upload({
    dataBuffer,
    filename,
    mineType,
    path,
  }: UploadFileDto): Promise<any> {
    const s3 = new S3({
      region: process.env.S3_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    const uploadResult = await s3
      .upload({
        Bucket: process.env.S3_BUCKET,
        Body: dataBuffer,
        Key: `${path}/${uuid()}.${filename.split('.').pop()}`,
        ACL: 'public-read',
        ContentType: mineType,
      })
      .promise();

    return uploadResult;
  }
}
