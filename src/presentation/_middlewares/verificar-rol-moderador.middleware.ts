import { NextFunction, Request, Response } from "express";
import { generarErrorCapaPresentacion } from "@presentation/_helpers/errors";

export const verificarRolModerador = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { persona } = req.personalizado?.solicitante;

        if (!persona.usuario.rol.includes('moderador')) {
            throw generarErrorCapaPresentacion({
                estado: 403, 
                codigo: 'no_autorizado', 
                mensaje: `No tienes permisos para realizar esta operación.`, 
                resultado: null
            });
        }

        next();
    } catch (error) {
        next(error);
    }
};
