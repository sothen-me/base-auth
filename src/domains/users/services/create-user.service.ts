import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HashProvider } from '@providers/hash/hash.provider';
import { UserEntity } from '../entities/user.entity';
import { UsersRepository } from '../repositories/users.repository';

interface CreateUserServiceRequest {
  name: string;
  email: string;
  password: string;
}

interface CreateUserServiceResponse {
  user: UserEntity;
}

@Injectable()
export class CreateUserService {
  constructor(
    private usersRepository: UsersRepository,
    private hashProvider: HashProvider,
  ) {}

  async execute(
    request: CreateUserServiceRequest,
  ): Promise<CreateUserServiceResponse> {
    const { name, email, password } = request;

    const isEmailAlreadyUsed = await this.usersRepository.findByEmail(email);

    if (isEmailAlreadyUsed) {
      throw new HttpException(
        'Email já cadastrado',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const user = new UserEntity({
      name,
      email,
      password: await this.hashProvider.generateHash(password),
    });

    this.usersRepository.create(user);

    return { user };
  }
}
