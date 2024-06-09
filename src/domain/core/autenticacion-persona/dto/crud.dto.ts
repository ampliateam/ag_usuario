export interface BuscarAutenticacionPersonaDTO {
    uid?: string;
    correo?: string;
}

export interface ActualizarAutenticacionPersonaDTO {
    buscarPor: BuscarAutenticacionPersonaDTO;
    actualizado: {
        correo?: string;
        correoVerificado?: boolean;
        deshabilitado?: boolean;
        contrasena?: string;
    }
}

export interface EliminarAutenticacionPersonaDTO {
    buscarPor: BuscarAutenticacionPersonaDTO;
}
