import { Request, Response, NextFunction } from 'express';

export const inicializacion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Construir el modelo personalizado del `Request`
    req.personalizado = {
      momentoSolicitud: new Date(),
      presentationSolicitante: { tipo: 'desconocido' },
    };

    // Verificar datos provenientes del cliente
    await verificarDatosProvenientesDelPS(req);

    next();
  } catch (error) {
    next(error);
  }
};

const verificarDatosProvenientesDelPS = async (req: Request) => {
  // TODO: Verifica los datos del Solicitante: coordenadas, navagador, zona, hora por zona, etc...
};
