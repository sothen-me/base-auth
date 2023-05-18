import { UserEntity } from '@domains/users/entities/user.entity';
import { UsersRepository } from '@domains/users/repositories/users.repository';
import { Injectable } from '@nestjs/common';
import { PrismaUserMapper } from '../mappers/prisma-user.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async findById(userId: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async create(user: UserEntity): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(user);

    await this.prisma.user.create({
      data: raw,
    });
  }

  async save(user: UserEntity): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(user);

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: raw,
    });
  }
}
