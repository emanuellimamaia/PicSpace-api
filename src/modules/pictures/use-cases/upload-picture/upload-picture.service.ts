import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { SavePictureService } from '../save-picture/save-picture.service';
import { Picture } from '../../domain/picture.entity';
import { Tag } from '../../domain/tag.entity';
import { ClarifaiService } from 'src/modules/clarifai/use-cases/clarifai.service';


@Injectable()
export class UploadPictureService {
  private s3Client: S3Client;

  constructor(
    private readonly clarifaiService: ClarifaiService,
    private readonly configService: ConfigService,
    private readonly savePictureService: SavePictureService
  ) {
    this.s3Client = new S3Client({
      region: this.configService.getOrThrow('AWS_S3_REGION'),
      endpoint: `https://s3.${this.configService.getOrThrow('AWS_S3_REGION')}.amazonaws.com`,
      forcePathStyle: true,
    });
  }

  async upload(fileName: string, file: Buffer, mimeType: string, userId: string) {
    try {
      // Analyze image with Clarifai first
      const clarifaiResponse = await this.clarifaiService.analyzeImage(file);

      // Get top 3 concepts (tags) from Clarifai response
      const topTags = clarifaiResponse
        .slice(0, 3)
        .map(concept => concept.name);

      // Generate a safe and unique filename
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 8);
      const fileExtension = fileName.split('.').pop().toLowerCase();
      const safeFileName = `${timestamp}-${randomString}.${fileExtension}`;

      // Upload to S3
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

      const imageUrl = `https://${this.configService.getOrThrow('AWS_S3_BUCKET_NAME')}.s3.${this.configService.getOrThrow('AWS_S3_REGION')}.amazonaws.com/${safeFileName}`;

      // Create Picture entity
      const picture = Picture.create({
        imageUrl,
        userId,
        tags: topTags.map(tag => Tag.create({ name: tag }))
      });

      // Save picture
      const savedPicture = await this.savePictureService.execute(picture);

      return {
        url: imageUrl,
        key: safeFileName,
        response,
        tags: savedPicture.tags
      };
    } catch (error) {
      console.error('Error uploading picture:', error);
      throw new InternalServerErrorException('Erro ao fazer upload da imagem');
    }
  }
}
