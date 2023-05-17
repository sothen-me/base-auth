import { IsEmail, IsNotEmpty } from 'class-validator';

export class RecoverPasswordDTO {
  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  email: string;

  @IsNotEmpty({ message: 'Obrigatório o envio do link de redirecionamento' })
  redirectTo: string;
}
