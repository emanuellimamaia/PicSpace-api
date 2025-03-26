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
      // Executa a transação
      const result = await this.prisma.$transaction(async (prisma) => {

        const createdPicture = await prisma.picture.create({
          data: {
            imageUrl: picture.imageUrl,
            user: {
              connect: { id: picture.userId },
            },
          },
        });


        await prisma.tag.createMany({
          data: picture.tags.map(tag => ({
            name: tag.name,
            imageId: createdPicture.id,
          })),
        });


        return prisma.picture.findUnique({
          where: { id: createdPicture.id },
          include: { tags: true },
        });
      });

      return PictureMappers.toDomain(result!);

    } catch (error) {
      console.error('Erro ao salvar a imagem:', error);
      throw new Error('Erro ao salvar a imagem');
    }
  }


}