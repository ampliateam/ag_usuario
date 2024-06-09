import { UserRecord } from 'firebase-admin/auth';

interface IFechaActividad {
    fechaCreacion: Date;
    fechaUltimoInicioSesion?: Date | null;
    fechaUltimoMomentoActivo?: Date | null;
}

interface IDatoProveedor {
    uid: string;
    nombre: string;
    correo: string;
    fotoPerfil: string;
    proveedorID: string;
    telefono: string;
}

interface IFirebaseAuthentication {
    // Objeto original de usuario de Firebase Authentication
    userRecord: UserRecord;
}

export interface IAutenticacionPersona {
    uid: string;
    correo: string;             // Mantener sincronizado con la base de datos
    correoVerificado: boolean;  // Mantener sincronizado con la base de datos
    deshabilitado: boolean;     // Mantener sincronizado con la base de datos
    fechaActividad: IFechaActividad;
    datosProveedor: IDatoProveedor[];
    contrasena: {
        salt: string,
        hash: string
    };
    fechaVencimientoToken: Date;
    firebaseAuthentication: IFirebaseAuthentication;
}

export interface IAutenticacionPersonaOpcional {
    uid?: string;
    correo?: string;             // Mantener sincronizado con la base de datos
    correoVerificado?: boolean;  // Mantener sincronizado con la base de datos
    deshabilitado?: boolean;     // Mantener sincronizado con la base de datos
    fechaActividad?: IFechaActividad;
    datosProveedor?: IDatoProveedor[];
    contrasena?: {
        salt: string,
        hash: string
    };
    fechaVencimientoToken?: Date;
    firebaseAuthentication?: IFirebaseAuthentication;
}

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
}

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
}
