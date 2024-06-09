import { NextFunction, Request, Response } from "express";
import { TSolicitanteTipo } from "@global/models/types";
import { generarErrorCapaPresentacion } from "../_helpers/errors";
import { verificarSolicitante as verificarSolicitanteHelper } from "../_helpers";

interface IConfigVerificarClienteSolicitante {
    tsp?: TSolicitanteTipo[];
}

export const verificarSolicitante = (config: IConfigVerificarClienteSolicitante) => {
    // Si no existe "TSP", entonces esta disponible para que cualquier cliente pueda consultar
    const noExisteTSP = !config?.tsp || !config.tsp.length;
    if(noExisteTSP) config.tsp = ['desconocido', 'persona' , 'externo'];
    
    // Middleware de autorizacion de usuario
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const tipoSolicitante = req.headers.tipo_solicitante as TSolicitanteTipo || 'desconocido';
            const authorization: string = req.headers['authorization'] as string;
            const idToken = authorization && authorization.split(' ')[0] === 'Bearer' ? 
            authorization.split(' ')[1] : '';

            // Verificar datos provenientes del cliente
            await verificarDatosProvenientesDelSolicitante(req);

            // Verificar TSP
            if (!config.tsp.includes(tipoSolicitante)) {
                throw generarErrorCapaPresentacion({
                    estado: 401, 
                    codigo: 'no_autorizado', 
                    mensaje: `El cliente tipo [${tipoSolicitante}] no puede realizar esta función.`, 
                    resultado: null
                });
            }

            // Verificar token del solicitante
            const {
                tokenDecodificado,
                autenticacion,
                usuario
            } = await verificarSolicitanteHelper(tipoSolicitante, idToken);

            // Construccion del solicitante
            if (tipoSolicitante !== 'desconocido') {
                req.personalizado.solicitante[tipoSolicitante].tokenDecodificado = tokenDecodificado;
                req.personalizado.solicitante[tipoSolicitante].autenticacion = autenticacion;
                req.personalizado.solicitante[tipoSolicitante].usuario = usuario;
            }

            next();
        } catch (error) {
            next(error);
        }
    }
};

const verificarDatosProvenientesDelSolicitante = async (req: Request) => {
    // TODO: Verifica los datos del Solicitante: coordenadas, navagador, zona, hora por zona, etc...
}
