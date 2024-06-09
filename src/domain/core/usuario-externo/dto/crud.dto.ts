import { IUsuarioExterno } from "@global/models/interfaces";
import { TUsuarioEstado, TUsuarioExternoRol } from "@global/models/types";

export interface CrearUsuarioExternoDTO {
    usuario: IUsuarioExterno;
}

export interface BuscarUsuarioExternoDTO {
    codigo?: string;
}

export interface ActualizarUsuarioExternoDTO {
    buscarPor: BuscarUsuarioExternoDTO;
    actualizado: {
        codigo?: string;
        observacion?: string;
        correo?: string;
        telefono?: string;
        rol?: TUsuarioExternoRol[];
        estado?: TUsuarioEstado;
        fechaCreacion?: number;
        fechaEliminacion?: number;
    }
}

export interface EliminarUsuarioExternoDTO {
    buscarPor: BuscarUsuarioExternoDTO;
}
