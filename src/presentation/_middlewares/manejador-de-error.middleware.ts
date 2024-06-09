import { Request, Response, NextFunction } from "express";
import { envs } from "@global/configs/envs";
import { manejadorDeError } from "../_helpers/errors";

export const mwManejadorDeError = (error: any, req: Request, res: Response, next: NextFunction): void => {
    if (envs.environment === 'local_development') console.error('SolicitudError:', error);
    const respuestaServicio = manejadorDeError(error);
    respuestaServicio.enviar(res);
};
