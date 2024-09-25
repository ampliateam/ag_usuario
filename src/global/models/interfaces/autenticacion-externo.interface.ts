import { IFechaActividad } from '../types';

export interface IAutenticacionExterno {
    uid: string;
    codigo: string;
    deshabilitado: boolean;     // Mantener sincronizado con la base de datos
    contrasena: {
        salt: string,
        hash: string
    };
    fechaActividad: IFechaActividad;
    fechaVencimientoToken: Date;
};

export interface IAutenticacionExternoOpcional {
    uid?: string;
    codigo?: string;
    deshabilitado?: boolean;     // Mantener sincronizado con la base de datos
    contrasena?: {
        salt: string,
        hash: string
    };
    fechaActividad?: IFechaActividad;
    fechaVencimientoToken?: Date;
};
