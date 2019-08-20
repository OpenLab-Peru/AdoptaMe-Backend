import { IsNumber, IsEmail, Length, IsEmpty, IsNotEmpty, MinLength, MaxLength, IsNumberString } from 'class-validator';

export class RegisterUser{
  @IsNotEmpty({
    message: 'El nombre es requerido.'
  })
  name: string;

  @IsNotEmpty({
    message: 'El apellido es requerido.'
  })
  lastName: string;

  @IsNumberString({
    message: 'El celular debe ser un numero.'
  })
  @Length(9,9, {
    message: 'El celular debe tener 9 caracteres numéricos.'
  })
  cellphone: string;

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

  @IsNotEmpty({
    message: 'La confirmación de contraseña no debe estar vacia.'
  })
  @MinLength(6, {
    message: 'La confirmación contraseña debe tener minimo 6 caracteres.'
  })
  @MaxLength(16, {
    message: 'La confirmación contraseña debe tener máximo 16 caracteres.'
  })
  confirmPassword: string;
}