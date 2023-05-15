import { NotFoundException } from '@nestjs/common';
import { makeUser } from '@test/factories/user.factory';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users.repository';
import { GetUserByIdService } from './get-user-by-id.service';

describe('Get user by id', () => {
  it('Should be able to get user by id', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const getUserById = new GetUserByIdService(usersRepository);

    const user = makeUser();

    await usersRepository.create(user);

    const response = await getUserById.execute({
      userId: user.id,
    });

    expect(response.user).toEqual(
      expect.objectContaining({ email: user.email }),
    );
  });

  it('Should not be able to get a non existing user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const getUserById = new GetUserByIdService(usersRepository);

    expect(() =>
      getUserById.execute({
        userId: 'non-existing-user-id',
      }),
    ).rejects.toThrow(NotFoundException);
  });
});
