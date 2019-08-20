import {  IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class LoginUser{
  @IsEmail({}, {
    message: 'No es un correo valido.'
  })
  email: string;

  @IsNotEmpty({
    message: 'La contraseña no debe estar vacia.'
  })
  @MinLength(6, {
    message: 'La contraseña debe tener minimo 6 caracteres.'
  })
  @MaxLength(16, {
    message: 'La contraseña debe tener máximo 16 caracteres.'
  })
  password: string;
}