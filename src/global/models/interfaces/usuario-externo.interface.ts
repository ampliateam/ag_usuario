import { TUsuarioEstado, TUsuarioExternoRol } from '@global/models/types';

export interface IUsuarioExterno {
    uid: string;
    codigo: string;
    correo: string;
    nombre: string;
    observacion: string;
    telefono: string;
    rol: TUsuarioExternoRol[];
    estado: TUsuarioEstado;
    fechaCreacion: Date;
    fechaEliminacion: Date | null;
};

export interface IUsuarioExternoOpcional {
    uid?: string;
    codigo?: string;
    correo?: string;
    nombre?: string;
    observacion?: string;
    telefono?: string;
    rol?: TUsuarioExternoRol[];
    estado?: TUsuarioEstado;
    fechaCreacion?: Date;
    fechaEliminacion?: Date | null;
};
