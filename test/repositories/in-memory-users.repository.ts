import { UserEntity } from '@domains/users/entities/user.entity';
import { UsersRepository } from '@domains/users/repositories/users.repository';

export class InMemoryUsersRepository implements UsersRepository {
  public users: UserEntity[] = [];

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = this.users.find((user) => user.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async findById(userId: string): Promise<UserEntity | null> {
    const user = this.users.find((user) => user.id === userId);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(user: UserEntity): Promise<void> {
    this.users.push(user);
  }

  async save(user: UserEntity): Promise<void> {
    const userIndex = this.users.findIndex(
      (userFind) => userFind.id === user.id,
    );

    if (userIndex >= 0) {
      this.users[userIndex] = user;
    }
  }
}
