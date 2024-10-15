import { NextFunction, Request, Response } from "express";
import { generarRespuestaServidor } from "@presentation/_helpers";

export const verificarUsuarioExterno = (req: Request, res: Response, next: NextFunction) => {
  try {
    const respuestaServidor = generarRespuestaServidor({
      exito: true,
      mensaje: 'Externo verificado con exito.',
      resultado: req.personalizado.presentationSolicitante,
    });

    res.json(respuestaServidor);
  } catch (error) {
    next(error);
  }
}
