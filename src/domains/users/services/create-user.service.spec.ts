import { HttpException } from '@nestjs/common';
import { makeUser } from '@test/factories/user.factory';
import { TestHashProvider } from '@test/providers/test-hash.provider';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users.repository';
import { CreateUserService } from './create-user.service';

describe('Create User', () => {
  it('Should be able to create a user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const hashProvider = new TestHashProvider();

    const createUser = new CreateUserService(usersRepository, hashProvider);

    const { user } = await createUser.execute({
      email: 'mail@test.com',
      name: 'Jane Doe',
      password: '1234567',
    });

    expect(user).toEqual(expect.objectContaining({ email: 'mail@test.com' }));
  });

  it('Should not be able to create a user with an already used email', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const hashProvider = new TestHashProvider();

    const createUser = new CreateUserService(usersRepository, hashProvider);

    const user = makeUser({ email: 'test@mail.com' });

    await usersRepository.create(user);

    expect(() =>
      createUser.execute({
        email: 'test@mail.com',
        name: 'Jane Doe',
        password: '1234567',
      }),
    ).rejects.toThrow(HttpException);
  });
});
