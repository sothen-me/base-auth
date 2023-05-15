import { UserEntity } from '@domains/users/entities/user.entity';
import { UsersRepository } from '@domains/users/repositories/users.repository';
import { Injectable, NotFoundException } from '@nestjs/common';

interface GetUserByIdServiceRequest {
  userId: string;
}

interface GetUserByIdServiceResponse {
  user: UserEntity;
}

@Injectable()
export class GetUserByIdService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(
    request: GetUserByIdServiceRequest,
  ): Promise<GetUserByIdServiceResponse> {
    const { userId } = request;

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return { user };
  }
}
