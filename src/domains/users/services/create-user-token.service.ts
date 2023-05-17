import { Injectable, NotFoundException } from '@nestjs/common';
import { MailProvider } from '@providers/mail/mail.provider';
import { UserTokenEntity } from '../entities/user-token.entity';
import { UsersTokensRepository } from '../repositories/users-tokens.repository';
import { UsersRepository } from '../repositories/users.repository';
import * as path from 'path';

interface CreateUserTokenServiceRequest {
  email: string;
  redirectTo: string;
}

interface CreateUserTokenServiceResponse {
  userToken: UserTokenEntity;
}

@Injectable()
export class CreateUserTokenService {
  constructor(
    private usersRepository: UsersRepository,
    private usersTokensRepository: UsersTokensRepository,
    private mailProvider: MailProvider,
  ) {}

  async execute(
    request: CreateUserTokenServiceRequest,
  ): Promise<CreateUserTokenServiceResponse> {
    const { email, redirectTo } = request;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException(
        'Nenhum usuário encontrado com o e-mail informado',
      );
    }

    const userToken = new UserTokenEntity({
      userId: user.id,
    });

    await this.usersTokensRepository.create(userToken);

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: 'Recuperação de senha',
      templateData: {
        file: path.resolve(__dirname, '..', 'templates', 'recover-password'),
        variables: {
          name: user.name,
          link: `${redirectTo}?token=${userToken.token}`,
        },
      },
    });

    return { userToken };
  }
}
