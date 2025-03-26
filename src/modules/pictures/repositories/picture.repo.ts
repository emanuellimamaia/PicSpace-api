import { Injectable } from "@nestjs/common";
import { IPictureRepo } from "./picture.repo.interface";
import { PrismaService } from "src/infra/prisma/prisma.service";
import { Picture } from "../domain/picture.entity";
import { PictureMappers } from "../mappers/picture.mappers";

@Injectable()
export class PictureRepo implements IPictureRepo {
  constructor(private readonly prisma: PrismaService) { }

  async savePicture(picture: Picture): Promise<Picture> {
    try {
      // Criar a imagem e as tags em uma única transação
      const pictureData = await this.prisma.picture.create({
        data: {
          imageUrl: picture.imageUrl,
          user: {
            connect: {
              id: picture.userId
            }
          },
          tags: {
            create: picture.tags.map(tag => ({
              name: tag.name
            }))
          }
        },
        include: {
          tags: true
        }
      });
      console.log('Saved picture data:', JSON.stringify(pictureData, null, 2));
      return PictureMappers.toDomain(pictureData);
    } catch (error) {
      console.error('Error saving picture:', error);
      throw new Error('Error ao salvar a imagem');
    }
  }

  async getPictures(userId: string): Promise<Picture[]> {
    const pictures = await this.prisma.picture.findMany({
      where: { userId },
      include: {
        tags: true
      }
    });
    console.log('Pictures from DB:', JSON.stringify(pictures, null, 2));
    return pictures.map(PictureMappers.toDomain);
  }
}