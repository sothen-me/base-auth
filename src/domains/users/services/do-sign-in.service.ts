import { UserEntity } from '@domains/users/entities/user.entity';
import { UsersRepository } from '@domains/users/repositories/users.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashProvider } from '@providers/hash/hash.provider';

interface DoSignInServiceRequest {
  email: string;
  password: string;
}

interface DoSignInServiceResponse {
  user: UserEntity;
  token: string;
}

@Injectable()
export class DoSignInService {
  constructor(
    private usersRepository: UsersRepository,
    private hashProvider: HashProvider,
    private jwtService: JwtService,
  ) {}

  async execute(
    request: DoSignInServiceRequest,
  ): Promise<DoSignInServiceResponse> {
    const { email, password } = request;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isTheRightPassword = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!isTheRightPassword) {
      throw new UnauthorizedException();
    }

    const token = await this.jwtService.signAsync({
      email,
      sub: user.id,
    });

    return { user, token };
  }
}
