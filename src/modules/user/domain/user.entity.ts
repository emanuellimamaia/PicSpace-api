import { Entity, EntityMetadata } from "src/shared/entity";

type UserProps = {
  id?: string;
  username: string;
  email: string;
  password: string

}

export class User extends Entity<UserProps> {
  constructor(props: UserProps, metadata?: EntityMetadata) {
    super(props, metadata)
  }

  static create(props: UserProps, metadata?: EntityMetadata) {
    return new User(props, metadata)
  }
  get id() {
    return this.props.id
  }
  get username() {
    return this.props.username
  }

  get email() {
    return this.props.email
  }
  get password() {
    return this.props.password
  }
}