import { NextFunction, Request, Response } from "express";
import { generarRespuestaServidor } from "@presentation/_helpers";

export const verificarUsuarioPersona = (req: Request, res: Response, next: NextFunction) => {
  try {
    const respuestaServidor = generarRespuestaServidor({
      exito: true,
      mensaje: 'Persona verificada con exito.',
      resultado: req.personalizado.presentationSolicitante,
    });

    res.json(respuestaServidor);
  } catch (error) {
    next(error);
  }
}
