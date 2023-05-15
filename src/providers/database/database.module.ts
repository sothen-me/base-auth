import { UsersRepository } from '@domains/users/repositories/users.repository';
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaUsersRepository } from './prisma/repositories/prisma-users.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
  exports: [UsersRepository],
})
export class DatabaseModule {}
