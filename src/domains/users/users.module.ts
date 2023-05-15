import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { HashModule } from '@providers/hash/hash.module';
import { AuthController } from './controllers/auth.controller';
import { UsersController } from './controllers/users.controller';
import { AuthGuard } from './guards/auth.guard';
import { CreateUserService } from './services/create-user.service';
import { DoSignInService } from './services/do-sign-in.service';
import { GetUserByIdService } from './services/get-user-by-id.service';

@Module({
  imports: [HashModule],
  controllers: [UsersController, AuthController],
  providers: [
    CreateUserService,
    DoSignInService,
    GetUserByIdService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class UsersModule {}
