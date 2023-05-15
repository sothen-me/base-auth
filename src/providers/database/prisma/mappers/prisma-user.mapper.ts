import { UserEntity } from '@domains/users/entities/user.entity';
import { User as RawUser } from '@prisma/client';

export class PrismaUserMapper {
  static toPrisma(user: UserEntity) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      deletedAt: user.deletedAt,
    };
  }

  static toDomain(raw: RawUser): UserEntity {
    return new UserEntity(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        createdAt: raw.createdAt,
        deletedAt: raw.deletedAt,
      },
      raw.id,
    );
  }
}
