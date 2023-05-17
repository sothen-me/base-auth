import { UserTokenEntity } from '@domains/users/entities/user-token.entity';

export class PrismaUserTokenMapper {
  static toPrisma(userToken: UserTokenEntity) {
    return {
      id: userToken.id,
      token: userToken.token,
      userId: userToken.userId,
      createdAt: userToken.createdAt,
      expiresAt: userToken.expiresAt,
    };
  }
}
