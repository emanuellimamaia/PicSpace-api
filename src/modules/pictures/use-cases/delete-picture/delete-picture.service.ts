import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IPictureRepo } from '../../repositories/picture.repo.interface';
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DeletePictureService {
  private s3Client: S3Client;
  constructor(
    @Inject('IPictureRepo')
    private readonly pictureRepo: IPictureRepo,
    private readonly configService: ConfigService,
  ) {
    this.s3Client = new S3Client({
      region: this.configService.getOrThrow('AWS_S3_REGION'),
      endpoint: `https://s3.${this.configService.getOrThrow('AWS_S3_REGION')}.amazonaws.com`,
      forcePathStyle: true,
    });
  }

  async execute(pictureId: string): Promise<void> {
    try {
      // Primeiro, buscar a imagem no banco para obter a URL
      const picture = await this.pictureRepo.getPictureById(pictureId);

      if (!picture) {
        throw new NotFoundException('Imagem não encontrada');
      }

      // Extrair o nome do arquivo da URL
      const imageUrl = picture.imageUrl;
      const fileName = imageUrl.split('/').pop();

      // Deletar do S3
      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: this.configService.getOrThrow('AWS_S3_BUCKET_NAME'),
          Key: fileName
        })
      );

      // Deletar do banco de dados
      await this.pictureRepo.deletePicture(pictureId);
    } catch (error) {
      console.error('Error deleting picture:', error);
      throw error;
    }
  }
}
