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
      return PictureMappers.toDomain(pictureData);
    } catch (error) {
      console.error('Error saving picture:', error);
      throw new Error('Error ao salvar a imagem');
    }
  }

  async getPictures(userId: string, tag?: string): Promise<Picture[]> {
    const pictures = await this.prisma.picture.findMany({
      where: {
        userId,
        ...(tag && {
          tags: {
            some: {
              name: {
                contains: tag,
                mode: 'insensitive'
              }
            }
          }
        })
      },
      include: {
        tags: true
      }
    });
    return pictures.map(picture => PictureMappers.toDomain(picture));
  }

  async getPictureById(pictureId: string): Promise<Picture | null> {
    const picture = await this.prisma.picture.findUnique({
      where: { id: pictureId },
      include: {
        tags: true
      }
    });
    return picture ? PictureMappers.toDomain(picture) : null;
  }

  async deletePicture(pictureId: string): Promise<void> {
    const picture = await this.prisma.picture.findUnique({
      where: { id: pictureId },
      include: { tags: true }
    });

    if (!picture) {
      throw new Error('Imagem não encontrada');
    }

    await this.prisma.picture.update({
      where: { id: pictureId },
      data: {
        tags: {
          disconnect: picture.tags.map(tag => ({ id: tag.id }))
        }
      }
    });

    await this.prisma.picture.delete({
      where: { id: pictureId }
    });
  }
}