import { Public } from '@decorators/public';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { CreateUserService } from '../services/create-user.service';
import { UserViewModel } from '../view-models/user.view-model';

@Controller('users')
export class UsersController {
  constructor(private createUser: CreateUserService) {}

  @Public()
  @Post()
  async create(@Body() body: CreateUserDTO) {
    const { name, email, password } = body;

    const { user } = await this.createUser.execute({
      name,
      email,
      password,
    });

    return {
      user: UserViewModel.toHTTP(user),
    };
  }
}
