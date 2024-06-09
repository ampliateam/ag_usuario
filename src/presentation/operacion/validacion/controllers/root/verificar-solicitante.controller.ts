import { NextFunction, Request, Response } from "express";
import {
    generarRespuestaServicio,
    verificarSolicitante as verificarSolicitanteHelper
} from "@presentation/_helpers";
import { generarErrorCapaPresentacion } from "@presentation/_helpers/errors";

export const verificarSolicitante = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            tsp,
            clienteSolicitanteTipo,
            idToken
        } = req.body;

        // Verificar TSP
        if (!tsp.includes(clienteSolicitanteTipo)) {
            throw generarErrorCapaPresentacion({
                estado: 401, 
                codigo: 'no_autorizado', 
                mensaje: `El cliente tipo [${clienteSolicitanteTipo}] no puede realizar esta función.`, 
                resultado: null
            });
        }

        // Verificar token del cliente
        const {
            tokenDecodificado,
            autenticacion,
            usuario
        } = await verificarSolicitanteHelper(clienteSolicitanteTipo, idToken);

        // Retornar respuesta
        generarRespuestaServicio({
            estado: 200,
            codigo: 'exito',
            mensaje: 'Se validó el usuario de manera correcta!',
            resultado: {
                tokenDecodificado,
                autenticacion,
                usuario
            }
        })
        .enviar(res);

    } catch (error) {
        next(error);
    }
}
