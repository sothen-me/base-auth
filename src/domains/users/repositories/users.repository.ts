import { UserEntity } from '../entities/user.entity';

export abstract class UsersRepository {
  abstract findByEmail(email: string): Promise<UserEntity | null>;
  abstract findById(userId: string): Promise<UserEntity | null>;
  abstract create(user: UserEntity): Promise<void>;
  abstract save(user: UserEntity): Promise<void>;
}
