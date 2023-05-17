import { UserTokenEntity } from '../entities/user-token.entity';

export abstract class UsersTokensRepository {
  abstract create(userToken: UserTokenEntity): Promise<void>;
}
