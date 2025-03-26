import { Entity, EntityMetadata } from "src/shared/entity";

export type TagProps = {
  id?: string;
  name: string;
  imageId?: string;
}

export class Tag extends Entity<TagProps> {
  private constructor(props: TagProps, metadata?: EntityMetadata) {
    super(props, metadata)
  }

  static create(props: TagProps, metadata?: EntityMetadata) {
    return new Tag(props, metadata)
  }

  get id() {
    return this.props.id
  }
  get name() {
    return this.props.name
  }
  get imageId() {
    return this.props.imageId
  }
}
