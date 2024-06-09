import { ErrorCapaDomain } from "@domain/_models";
import { ErrorCapaPresentacion, RespuestaServicio } from "@presentation/_models";
import { IRespuestaServicio } from "@presentation/_models/interfaces";
import { generarRespuestaServicio } from "../generar-respuesta-servicio.helper";

export const manejadorDeError = (error: any): RespuestaServicio => {
    let respuestaServicio: IRespuestaServicio;

    if (error instanceof ErrorCapaDomain || error instanceof ErrorCapaPresentacion) {
        respuestaServicio = {
            estado: error.estado,
            codigo: error.codigo,
            mensaje: error.mensaje,
            resultado: error.resultado,
        };
    } else if (error instanceof TypeError) {
        respuestaServicio = {
            estado: 400,
            codigo: 'error_cliente',
            mensaje: error.message,
            resultado: null
        };
    } else if (error instanceof Error) {
        respuestaServicio = {
            estado: 500,
            codigo: 'error_desconocido',
            mensaje: error.message,
            resultado: null
        };
    } else {
        respuestaServicio = {
            estado: 500,
            codigo: 'error_desconocido',
            mensaje: 'Error desconocido',
            resultado: null
        };
    }

    const respuestaServicioGenerado = generarRespuestaServicio(respuestaServicio);
    return respuestaServicioGenerado as RespuestaServicio;
}
