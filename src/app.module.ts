import { UsersModule } from '@domains/users/users.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from './providers/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SCRET,
      signOptions: { expiresIn: '1d' },
    }),
    DatabaseModule,
    UsersModule,
  ],
})
export class AppModule {}
