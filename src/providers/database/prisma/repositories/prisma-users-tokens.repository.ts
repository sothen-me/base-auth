import { UserTokenEntity } from '@domains/users/entities/user-token.entity';
import { UsersTokensRepository } from '@domains/users/repositories/users-tokens.repository';
import { Injectable } from '@nestjs/common';
import { PrismaUserTokenMapper } from '../mappers/prisma-user-token.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUsersTokensRepository implements UsersTokensRepository {
  constructor(private prisma: PrismaService) {}

  async create(userToken: UserTokenEntity): Promise<void> {
    const raw = PrismaUserTokenMapper.toPrisma(userToken);

    await this.prisma.userToken.create({
      data: raw,
    });
  }
}
