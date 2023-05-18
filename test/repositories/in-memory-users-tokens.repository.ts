import { UserTokenEntity } from '@domains/users/entities/user-token.entity';
import { UsersTokensRepository } from '@domains/users/repositories/users-tokens.repository';

export class InMemoryUsersTokensRepository implements UsersTokensRepository {
  public usersTokens: UserTokenEntity[] = [];

  async create(userToken: UserTokenEntity): Promise<void> {
    this.usersTokens.push(userToken);
  }

  async findByToken(token: string): Promise<UserTokenEntity | null> {
    const userToken = this.usersTokens.find(
      (userToken) => userToken.token === token,
    );

    if (!userToken) {
      return null;
    }
    return userToken;
  }
}
