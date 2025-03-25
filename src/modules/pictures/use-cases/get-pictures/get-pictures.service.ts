import { ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GetPicturesService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
    endpoint: `https://s3.${this.configService.getOrThrow('AWS_S3_REGION')}.amazonaws.com`,
    forcePathStyle: true,
  });

  constructor(private readonly configService: ConfigService) { }

  async getAllPictures() {
    const command = new ListObjectsV2Command({
      Bucket: this.configService.getOrThrow('AWS_S3_BUCKET_NAME'),
    });

    const response = await this.s3Client.send(command);

    return response.Contents?.map(item => ({
      key: item.Key,
      lastModified: item.LastModified,
      size: item.Size,
      url: `https://${this.configService.getOrThrow('AWS_S3_BUCKET_NAME')}.s3.${this.configService.getOrThrow('AWS_S3_REGION')}.amazonaws.com/${item.Key}`
    })) || [];
  }
} 