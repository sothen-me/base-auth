import { Public } from '@decorators/public';
import { UserViewModel } from '@domains/users/view-models/user.view-model';
import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { BaseAuthRequestDTO } from '../dtos/base-auth-request.dto';
import { DoSignInDTO } from '../dtos/do-sign-in.dto';
import { RecoverPasswordDTO } from '../dtos/recover-password.dto';
import { ResetPasswordDTO } from '../dtos/reset-password.dto';
import { CreateUserTokenService } from '../services/create-user-token.service';
import { DoSignInService } from '../services/do-sign-in.service';
import { GetUserByIdService } from '../services/get-user-by-id.service';
import { ResetUserPassowrdService } from '../services/reset-user-password.service';

@Controller('auth')
export class AuthController {
  constructor(
    private doSignIn: DoSignInService,
    private getUserById: GetUserByIdService,
    private createUserToken: CreateUserTokenService,
    private resetUserPassword: ResetUserPassowrdService,
  ) {}

  @Public()
  @Post()
  async signIn(@Body() body: DoSignInDTO) {
    const { email, password } = body;

    const { user, token } = await this.doSignIn.execute({
      email,
      password,
    });

    return {
      user: UserViewModel.toHTTP(user),
      token,
    };
  }

  @Get('me')
  async getUserLogged(@Request() request: BaseAuthRequestDTO) {
    const userId = request.user.sub;

    const { user } = await this.getUserById.execute({ userId });

    return {
      user: UserViewModel.toHTTP(user),
    };
  }

  @Public()
  @Post('recover-password')
  async recoverPassword(@Body() body: RecoverPasswordDTO) {
    const { email, redirectTo } = body;

    await this.createUserToken.execute({ email, redirectTo });
  }

  @Public()
  @Post('reset-password')
  async resetPassword(@Body() body: ResetPasswordDTO) {
    const { token, password } = body;

    await this.resetUserPassword.execute({ token, password });
  }
}
