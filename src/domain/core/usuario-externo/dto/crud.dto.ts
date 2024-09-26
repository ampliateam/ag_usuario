import { IUsuarioExternoOpcional } from '@global/models/interfaces';

export interface CrearUsuarioExternoDTO {
    usuario: IUsuarioExternoOpcional;
}

export interface BuscarUsuarioExternoDTO {
    codigo?: string;
}

export interface ActualizarUsuarioExternoDTO {
    buscarPor: BuscarUsuarioExternoDTO;
    actualizado: IUsuarioExternoOpcional;
}

export interface EliminarUsuarioExternoDTO {
    buscarPor: BuscarUsuarioExternoDTO;
}
