import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CrearUsuarioDTO {
  @IsString()
  @IsNotEmpty({ message: 'El codigo no puede estar vacío' })
  codigo: string;
  
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  @IsNotEmpty({ message: 'El correo no puede estar vacío' })
  correo: string;
  
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsNotEmpty({ message: 'La contraseña no puede estar vacío' })
  contrasena: string;

  @IsString()
  @IsNotEmpty({ message: 'La confirmación de contraseña no puede estar vacío' })
  confirmacionContrasena: string;

  constructor (dto: any) {
    this.codigo = dto.codigo;
    this.correo = dto.correo;
    this.nombre = dto.nombre || '';
    this.contrasena = dto.contrasena;
    this.confirmacionContrasena = dto.confirmacionContrasena;
  }

  toObject () {
    return {
      codigo: this.codigo,
      correo: this.correo,
      nombre: this.nombre,
      contrasena: this.contrasena,
      confirmacionContrasena: this.confirmacionContrasena,
    };
  }
}
