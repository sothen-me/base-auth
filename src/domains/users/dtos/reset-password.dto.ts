import { IsNotEmpty, IsUUID, MinLength } from 'class-validator';

export class ResetPasswordDTO {
  @IsUUID(undefined, { message: 'Token inválido' })
  token: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'A senha precisa ter pelo menos 8 caracteres' })
  password: string;
}
