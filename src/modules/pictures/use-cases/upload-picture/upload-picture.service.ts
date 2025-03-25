import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadPictureService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
    endpoint: `https://s3.${this.configService.getOrThrow('AWS_S3_REGION')}.amazonaws.com`,
    forcePathStyle: true,
  });

  constructor(private readonly configService: ConfigService) { }
  async upload(fileName: string, file: Buffer, mimeType: string) {
    const safeFileName = fileName
      .replace(/\s+/g, '-') // Substitui espaços por hífen
      .replace(/[()]/g, ''); // Remove parênteses

    try {
      const response = await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.configService.getOrThrow('AWS_S3_BUCKET_NAME'),
          Key: safeFileName,
          Body: file,
          ACL: 'public-read',
          ContentType: mimeType,
          ContentDisposition: 'inline'
        }),
      );

      console.log('Upload concluído com sucesso:', response);

      return {
        url: `https://${this.configService.getOrThrow('AWS_S3_BUCKET_NAME')}.s3.${this.configService.getOrThrow('AWS_S3_REGION')}.amazonaws.com/${fileName}`,
        key: fileName,
        response
      };
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      throw error;
    }
  }
}
