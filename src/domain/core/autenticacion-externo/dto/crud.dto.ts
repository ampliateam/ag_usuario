import { IFechaActividad } from "@global/models/interfaces";

export interface CrearAutenticacionExternoDTO {
    codigo: string;
    contrasena: string;
}

export interface BuscarAutenticacionExternoDTO {
    codigo: string;
}

export interface ActualizarAutenticacionExternoDTO {
    buscarPor: BuscarAutenticacionExternoDTO;
    actualizado: {
        codigo: string;
        deshabilitado: boolean;     // Mantener sincronizado con la base de datos
        contrasena: {
            salt: string,
            hash: string
        };
        fechaActividad: IFechaActividad;
        fechaVencimientoToken: Date | null;
    }
}

export interface EliminarAutenticacionExternoDTO {
    buscarPor: BuscarAutenticacionExternoDTO;
}
