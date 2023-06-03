import { NotFoundException } from '@nestjs/common';
import { makeUser } from '@test/factories/user.factory';
import { TestMailProvider } from '@test/providers/test-mail.provider';
import { InMemoryUsersTokensRepository } from '@test/repositories/in-memory-users-tokens.repository';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users.repository';
import { CreateUserTokenService } from './create-user-token.service';

describe('Create User Token', () => {
  it('Should be able to create a user token', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const usersTokensRepository = new InMemoryUsersTokensRepository();
    const testMailProvider = new TestMailProvider();

    const user = makeUser({ email: 'test@mail.com' });
    await usersRepository.create(user);

    const createUserToken = new CreateUserTokenService(
      usersRepository,
      usersTokensRepository,
      testMailProvider,
    );

    const { userToken } = await createUserToken.execute({
      email: 'test@mail.com',
      redirectTo: 'http://test.com',
    });

    expect(userToken).toEqual(expect.objectContaining({ userId: user.id }));
  });

  it('Should not be able to create a token to a non existing user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const usersTokensRepository = new InMemoryUsersTokensRepository();
    const testMailProvider = new TestMailProvider();

    const createUserToken = new CreateUserTokenService(
      usersRepository,
      usersTokensRepository,
      testMailProvider,
    );

    expect(() =>
      createUserToken.execute({
        email: 'notfound@test.com',
        redirectTo: 'http://test.com',
      }),
    ).rejects.toThrow(NotFoundException);
  });
});
