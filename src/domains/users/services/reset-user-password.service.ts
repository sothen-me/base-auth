import { isAfter } from '@helpers/date';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { HashProvider } from '@providers/hash/hash.provider';
import { UserEntity } from '../entities/user.entity';
import { UsersTokensRepository } from '../repositories/users-tokens.repository';
import { UsersRepository } from '../repositories/users.repository';

interface ResetUserPassowrdServiceRequest {
  token: string;
  password: string;
}

interface ResetUserPassowrdServiceResponse {
  user: UserEntity;
}

@Injectable()
export class ResetUserPassowrdService {
  constructor(
    private usersRepository: UsersRepository,
    private usersTokensRepository: UsersTokensRepository,
    private hashProvider: HashProvider,
  ) {}

  async execute(
    request: ResetUserPassowrdServiceRequest,
  ): Promise<ResetUserPassowrdServiceResponse> {
    const { token, password } = request;

    const userToken = await this.usersTokensRepository.findByToken(token);

    if (!userToken) {
      throw new NotFoundException('Token inválido');
    }

    const user = await this.usersRepository.findById(userToken.userId);

    if (!user) {
      throw new NotFoundException('Usuário não existe');
    }

    if (isAfter(Date.now(), userToken.expiresAt)) {
      throw new UnauthorizedException('Token expirado');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);

    return { user };
  }
}
