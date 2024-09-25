import { IUsuarioPersonaOpcional } from '@global/models/interfaces';

export interface CrearUsuarioPersonaDTO {
    usuario: IUsuarioPersonaOpcional;
};

export interface BuscarUsuarioPersonaDTO {
    uid?: string;
    correo?: string;
    codigo?: string;
};

export interface ActualizarUsuarioPersonaDTO {
    buscarPor: BuscarUsuarioPersonaDTO;
    actualizado: IUsuarioPersonaOpcional;
};

export interface EliminarUsuarioPersonaDTO {
    buscarPor: BuscarUsuarioPersonaDTO;
    fechaEliminacion: Date;
}
