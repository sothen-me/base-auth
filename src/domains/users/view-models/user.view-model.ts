import { UserEntity } from '../entities/user.entity';

export class UserViewModel {
  static toHTTP(user: UserEntity) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
}
