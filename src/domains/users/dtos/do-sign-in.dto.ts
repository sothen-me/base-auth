import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class DoSignInDTO {
  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  email: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'A senha precisa ter pelo menos 8 caracteres' })
  password: string;
}
