import { IsString, IsOptional, IsEmail, Length } from 'class-validator';

export class ActualizarUsuarioDTO {
    @IsOptional()
    @IsString()
    @IsEmail()
    correo: string;

    @IsOptional()
    @IsString()
    @Length(1, 25, { message: "La longitud del código debe estar entre $constraint1 y $constraint2 caracteres." })
    codigo: string;

    @IsOptional()
    @IsString()
    @Length(1, 250, { message: "La longitud del nombre debe estar entre $constraint1 y $constraint2 caracteres." })
    nombre: string;

    @IsOptional()
    @IsString()
    @Length(6, 20, { message: "La longitud de la contraseña debe estar entre $constraint1 y $constraint2 caracteres." })
    contrasena: string;
    
    @IsOptional()
    @IsString()
    @Length(6, 20, { message: "La longitud de la confirmación de la contraseña debe estar entre $constraint1 y $constraint2 caracteres." })
    confirmacionContrasena: string;
}
