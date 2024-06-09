import { IsString, IsNotEmpty, IsEmail, Length, IsOptional } from 'class-validator';

export class CrearUsuarioDTO {
    @IsNotEmpty({ message: 'El correo es obligatorio' })
    @IsString()
    @IsEmail()
    correo: string;
  
    @IsOptional()
    @IsString()
    @Length(1, 250, { message: "La longitud del nombre debe estar entre $constraint1 y $constraint2 caracteres." })
    nombre: string;

    @IsNotEmpty({ message: 'El código de usuario es obligatorio' })
    @IsString()
    @Length(1, 25, { message: "La longitud del código debe estar entre $constraint1 y $constraint2 caracteres." })
    codigo: string;
    
    @IsNotEmpty({ message: 'La contraseña es obligatoria' })
    @IsString()
    @Length(6, 25, { message: "La longitud de la contraseña debe estar entre $constraint1 y $constraint2 caracteres." })
    contrasena: string;
    
    @IsNotEmpty({ message: 'La confirmación de contraseña es obligatoria' })
    @IsString()
    @Length(6, 25, { message: "La longitud de la confirmación de contraseña debe estar entre $constraint1 y $constraint2 caracteres." })
    confirmacionContrasena: string;
}