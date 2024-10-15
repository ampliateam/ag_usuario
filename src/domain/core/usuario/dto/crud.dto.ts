import { IUsuarioOpcional } from '@global/models/ag_usuario';

export interface CrearUsuarioDTO {
    usuario: IUsuarioOpcional;
};

export interface BuscarUsuarioDTO {
    uid?: string;
    correo?: string;
    codigo?: string;
};

export interface ActualizarUsuarioDTO {
    buscarPor: BuscarUsuarioDTO;
    actualizado: IUsuarioOpcional;
};
