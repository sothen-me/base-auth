import { UserTokenEntity } from '../entities/user-token.entity';

export abstract class UsersTokensRepository {
  abstract create(userToken: UserTokenEntity): Promise<void>;
  abstract findByToken(token: string): Promise<UserTokenEntity | null>;
  abstract save(userToken: UserTokenEntity): Promise<void>;
}
