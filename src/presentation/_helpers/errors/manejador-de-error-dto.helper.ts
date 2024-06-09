import { ErrorCapaPresentacion } from "@presentation/_models";
import { generarErrorCapaPresentacion } from "./generar-error-capa-presentacion.helper";

export const manejadorDeErrorDTO = (error: any): ErrorCapaPresentacion => {
    console.log('error-dto', error);

    return generarErrorCapaPresentacion({
        estado: 400, 
        codigo: 'error_dto', 
        mensaje: 'Error en dto.', 
        resultado: JSON.stringify(error)
    });
}