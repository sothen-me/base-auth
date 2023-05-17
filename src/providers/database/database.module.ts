import { UsersTokensRepository } from '@domains/users/repositories/users-tokens.repository';
import { UsersRepository } from '@domains/users/repositories/users.repository';
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaUsersTokensRepository } from './prisma/repositories/prisma-users-tokens.repository';
import { PrismaUsersRepository } from './prisma/repositories/prisma-users.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: UsersTokensRepository,
      useClass: PrismaUsersTokensRepository,
    },
  ],
  exports: [UsersRepository, UsersTokensRepository],
})
export class DatabaseModule {}
