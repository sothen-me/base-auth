import { UserTokenEntity } from '@domains/users/entities/user-token.entity';
import { UserToken as RawUserToken } from '@prisma/client';

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

  static toDomain(raw: RawUserToken) {
    return new UserTokenEntity(
      {
        userId: raw.userId,
        createdAt: raw.createdAt,
        expiresAt: raw.expiresAt,
      },
      raw.id,
      raw.token,
    );
  }
}
