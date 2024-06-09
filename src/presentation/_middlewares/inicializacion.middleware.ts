import { TSolicitanteTipo, listaSolicitanteTipo } from "@global/models/types";
import { Request, Response, NextFunction } from "express";
import { generarErrorCapaPresentacion } from "../_helpers/errors";

export const inicializacion = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const momentoSolicitud = new Date();

        if (!req.headers.tipo_solicitante) req.headers.tipo_solicitante = 'desconocido';
        const clienteSolicitanteTipo = req.headers.tipo_solicitante as TSolicitanteTipo;
        if (clienteSolicitanteTipo && !listaSolicitanteTipo.includes(clienteSolicitanteTipo)) {
            throw generarErrorCapaPresentacion({
                estado: 400,
                codigo: 'cliente_invalido',
                mensaje: 'El ClienteSolicitanteTipo no es válido.',
                resultado: null
            });
        }

        req.personalizado = {
            solicitante: { tipo: clienteSolicitanteTipo },
            momentoSolicitud
        };

        if (clienteSolicitanteTipo !== 'desconocido') {
            req.personalizado.solicitante[clienteSolicitanteTipo] = {
                autenticacion: null,
                tokenDecodificado: null,
                usuario: null
            };
        }

        const reqBody = req.body;
        for (const propiedad in reqBody) {
            if (typeof req.body[propiedad] === 'string')
                req.body[propiedad] = reqBody[propiedad].trim();
        }

        next()
    } catch (error) {
        next(error)
    }
};
