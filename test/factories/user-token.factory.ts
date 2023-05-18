import { UserTokenEntity } from '@domains/users/entities/user-token.entity';

type Override = Partial<UserTokenEntity>;

export function makeUserToken(override: Override = {}) {
  return new UserTokenEntity({
    userId: 'user-id',
    ...override,
  });
}
