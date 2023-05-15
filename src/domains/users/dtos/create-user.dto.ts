import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  email: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'A senha precisa ter pelo menos 8 caracteres' })
  password: string;

  @IsNotEmpty()
  @MinLength(3, { message: 'O nome precisa ter pelo menos 3 caracteres' })
  name: string;
}
