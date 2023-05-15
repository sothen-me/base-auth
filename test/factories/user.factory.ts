import { UserEntity } from '@domains/users/entities/user.entity';

type Override = Partial<UserEntity>;

export function makeUser(override: Override = {}) {
  return new UserEntity({
    name: 'Jane doe',
    email: 'test@mail.com',
    password: 'pass-test',
    ...override,
  });
}
