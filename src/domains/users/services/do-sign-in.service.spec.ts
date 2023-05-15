import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { makeUser } from '@test/factories/user.factory';
import { TestHashProvider } from '@test/providers/test-hash.provider';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users.repository';
import { DoSignInService } from './do-sign-in.service';

describe('Do sign in', () => {
  it('Should be able to do sign in', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const hashProvider = new TestHashProvider();
    const jwtService = new JwtService({ secret: 'test' });

    const doSignIn = new DoSignInService(
      usersRepository,
      hashProvider,
      jwtService,
    );

    const user = makeUser();

    await usersRepository.create(user);

    const response = await doSignIn.execute({
      email: user.email,
      password: user.password,
    });

    expect(response.user).toEqual(
      expect.objectContaining({ email: user.email }),
    );
  });

  it('Should not be able to do sign in with email that not belong a any user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const hashProvider = new TestHashProvider();
    const jwtService = new JwtService({ secret: 'test' });

    const doSignIn = new DoSignInService(
      usersRepository,
      hashProvider,
      jwtService,
    );

    expect(() =>
      doSignIn.execute({
        email: 'test@mail.com',
        password: 'fake-password',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('Should not be able to do sign in with wrong password', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const hashProvider = new TestHashProvider();
    const jwtService = new JwtService({ secret: 'test' });

    const doSignIn = new DoSignInService(
      usersRepository,
      hashProvider,
      jwtService,
    );

    const user = makeUser({ email: 'test@mail.com' });

    await usersRepository.create(user);

    expect(() =>
      doSignIn.execute({
        email: 'test@mail.com',
        password: 'wrong-password',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
