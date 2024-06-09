import {
  IsString,
  IsNotEmpty,
  IsEmail
} from "class-validator";

export class OmcSolicitudDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  correo: string;
}

export class OmcActualizarDTO {
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsString()
  contrasena: string;

  @IsNotEmpty()
  @IsString()
  confirmacionContrasena: string;
}
