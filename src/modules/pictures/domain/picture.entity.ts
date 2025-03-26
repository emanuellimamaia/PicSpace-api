import { Entity, EntityMetadata } from "src/shared/entity";
import { Tag } from "./tag.entity";


export type PictureProps = {
  id?: string;
  imageUrl: string;
  userId: string;
  tags: Tag[];
}
export class Picture extends Entity<PictureProps> {
  constructor(props: PictureProps, metadata?: EntityMetadata) {
    super(props, metadata)
  }

  static create(props: PictureProps, metadata?: EntityMetadata) {
    return new Picture(props, metadata)
  }

  get id() {
    return this.props.id
  }
  get imageUrl() {
    return this.props.imageUrl
  }
  get userId() {
    return this.props.userId
  }
  get tags() {
    return this.props.tags
  }

}