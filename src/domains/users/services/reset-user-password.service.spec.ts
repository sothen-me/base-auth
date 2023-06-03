import { addMinutes } from '@helpers/date';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { makeUserToken } from '@test/factories/user-token.factory';
import { makeUser } from '@test/factories/user.factory';
import { TestHashProvider } from '@test/providers/test-hash.provider';
import { InMemoryUsersTokensRepository } from '@test/repositories/in-memory-users-tokens.repository';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users.repository';
import { ResetUserPassowrdService } from './reset-user-password.service';

describe('Reset User Password', () => {
  it('Should be able to reset a user password', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const usersTokensRepository = new InMemoryUsersTokensRepository();
    const hashProvider = new TestHashProvider();

    const user = makeUser({ email: 'test@mail.com' });
    await usersRepository.create(user);

    const userToken = makeUserToken({ userId: user.id });
    await usersTokensRepository.create(userToken);

    const resetUserPassword = new ResetUserPassowrdService(
      usersRepository,
      usersTokensRepository,
      hashProvider,
    );

    const { user: userEditer } = await resetUserPassword.execute({
      token: userToken.token,
      password: 'new-password',
    });

    expect(
      hashProvider.compareHash(userEditer.password, 'new-password'),
    ).toBeTruthy();
  });

  it('Should not be able to reset a user password with invalid token', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const usersTokensRepository = new InMemoryUsersTokensRepository();
    const hashProvider = new TestHashProvider();

    const resetUserPassword = new ResetUserPassowrdService(
      usersRepository,
      usersTokensRepository,
      hashProvider,
    );

    expect(() =>
      resetUserPassword.execute({
        token: 'invalid-token',
        password: 'new-password',
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('Should not be able to reset a user password with a token that already used', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const usersTokensRepository = new InMemoryUsersTokensRepository();
    const hashProvider = new TestHashProvider();

    const userToken = makeUserToken({
      userId: 'user-id-example',
      deletedAt: new Date(),
    });
    await usersTokensRepository.create(userToken);

    const resetUserPassword = new ResetUserPassowrdService(
      usersRepository,
      usersTokensRepository,
      hashProvider,
    );

    expect(() =>
      resetUserPassword.execute({
        token: 'invalid-token',
        password: 'new-password',
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('Should not be able to reset a user password with userId that not exist', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const usersTokensRepository = new InMemoryUsersTokensRepository();
    const hashProvider = new TestHashProvider();

    const userToken = makeUserToken({ userId: 'user-that-not-exist' });
    await usersTokensRepository.create(userToken);

    const resetUserPassword = new ResetUserPassowrdService(
      usersRepository,
      usersTokensRepository,
      hashProvider,
    );

    expect(() =>
      resetUserPassword.execute({
        token: 'invalid-token',
        password: 'new-password',
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('Should not be able to reset a user password with token expired', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const usersTokensRepository = new InMemoryUsersTokensRepository();
    const hashProvider = new TestHashProvider();

    const user = makeUser({ email: 'test@mail.com' });
    await usersRepository.create(user);

    const userToken = makeUserToken({
      userId: user.id,
      expiresAt: addMinutes(new Date(), -30),
    });
    await usersTokensRepository.create(userToken);

    const resetUserPassword = new ResetUserPassowrdService(
      usersRepository,
      usersTokensRepository,
      hashProvider,
    );

    expect(() =>
      resetUserPassword.execute({
        token: userToken.token,
        password: 'new-password',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
