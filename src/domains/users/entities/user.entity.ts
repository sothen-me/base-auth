import { Replace } from '@helpers/replace';
import { randomUUID } from 'node:crypto';

interface UserEntityProps {
  name: string;
  email: string;
  password: string;
  deletedAt?: Date | null;
  createdAt: Date;
}

export class UserEntity {
  private _id: string;
  private props: UserEntityProps;

  constructor(
    props: Replace<UserEntityProps, { createdAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get email(): string {
    return this.props.email;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get password(): string {
    return this.props.password;
  }

  public set password(password: string) {
    this.props.password = password;
  }

  public delete() {
    this.props.deletedAt = new Date();
  }

  public get deletedAt(): Date | null | undefined {
    return this.props.deletedAt;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
