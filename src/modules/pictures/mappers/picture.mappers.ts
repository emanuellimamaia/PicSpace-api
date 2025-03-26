import { Picture } from "../domain/picture.entity";
import { Tag } from "../domain/tag.entity";
import { Prisma } from "@prisma/client";

export class PictureMappers {
  static toDomain(raw: any) {
    return Picture.create({
      id: raw.id,
      imageUrl: raw.imageUrl,
      userId: raw.userId,
      tags: raw.tags ? raw.tags.map(tag => Tag.create({ id: tag.id, name: tag.name, imageId: tag.id })) : [],
    }, {
      id: raw.id,
      created_at: raw.createdAt,
      updated_at: raw.updatedAt,
    })
  }

  static toDto(picture: Picture) {
    return {
      id: picture.id,
      imageUrl: picture.imageUrl,
      userId: picture.userId,
      tags: picture.tags.map(tag => ({
        id: tag.id,
        name: tag.name
      })),
    }
  }
}