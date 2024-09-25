import { TUsuarioEstado, TUsuarioPersonaRol } from '@global/models/types';

export interface IUsuarioPersona {
    uid: string;
    correo: string;
    codigo: string;
    correoVerificado: boolean;
    nombre: string;
    telefono: string;
    fotoPerfil: string;
    rol: TUsuarioPersonaRol[];
    estado: TUsuarioEstado;
    fechaCreacion: Date;
    fechaEliminacion: Date | null;
};


export interface IUsuarioPersonaOpcional {
    uid?: string;
    correo?: string;
    codigo?: string;
    correoVerificado?: boolean;
    nombre?: string;
    telefono?: string;
    fotoPerfil?: string;
    rol?: TUsuarioPersonaRol[];
    estado?: TUsuarioEstado;
    fechaCreacion?: Date;
    fechaEliminacion?: Date | null;
};
