import { addMinutes } from '@helpers/date';
import { Replace } from '@helpers/replace';
import { randomUUID } from 'node:crypto';

interface UserTokenEntityProps {
  userId: string;
  createdAt: Date;
  expiresAt: Date;
}

export class UserTokenEntity {
  private _id: string;
  private _token: string;
  private props: UserTokenEntityProps;

  constructor(
    props: Replace<
      UserTokenEntityProps,
      { createdAt?: Date; expiresAt?: Date | null }
    >,
    id?: string,
    token?: string,
  ) {
    this._id = id ?? randomUUID();
    this._token = token ?? randomUUID();

    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      expiresAt: props.expiresAt ?? addMinutes(new Date(), 15),
    };
  }

  public get id(): string {
    return this._id;
  }

  public get token(): string {
    return this._token;
  }

  public get userId(): string {
    return this.props.userId;
  }

  public set userId(userId: string) {
    this.props.userId = userId;
  }

  public get expiresAt(): Date {
    return this.props.expiresAt;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
