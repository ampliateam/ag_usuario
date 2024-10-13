import { Request, Response, NextFunction } from 'express';
import { envs } from '@global/configs/envs';
import { ErrorCapaGlobal } from '@global/models/_system';
import { generarRespuestaServidor } from '@presentation/_helpers';
import { IRespuestaServidor, IRespuestaServidorOpcional } from '@presentation/_models/interfaces';
import { generarErrorCapaPresentation } from '@presentation/_errors';

export const mwManejadorDeError = (error: any, req: Request, res: Response, next: NextFunction): void => {
  if (envs.environment === 'personal') console.error('SolicitudError:', error);
  const { status, data } = manejadorDeError(error);
  
  res.status(status).json(data);
};

const manejadorDeError = (error: any): { status: number, data: IRespuestaServidor } => {
  if (envs.environment === 'personal') console.log('manejadorDeError: ', error);

  let status = 500;
  let respuestaServidor: IRespuestaServidorOpcional;

  if (error instanceof ErrorCapaGlobal || error.ref.startsWith('agendalia/')) {
    // Duplica el `IRespuestaServidor` del microservicio hijo
    status = error.estado;
    respuestaServidor = {
      exito: false,
      mensaje: error.mensajeCliente,
      resultado: error,
      nombreServicio: error.ref.split('/')[1],
    };
  } else if (error instanceof TypeError) {
    // Solo para los casos de errores en `/presentation`
    status = 400;
    const mensajeCliente = '¡Ohh Ohh! Hubo un problema. Intentelo de nuevo enseguida.';
    const resultado = generarErrorCapaPresentation({
      estado: status,
      codigo: 'error_tipo_de_dato',
      mensajeServidor: error.message,
      mensajeCliente,
      resultado: error,
    });
    respuestaServidor = {
      exito: false,
      mensaje: mensajeCliente,
      resultado: resultado.toObject(),
    };
  } else if (error instanceof Error) {
    // Solo para los casos de errores en `/presentation`
    status = 500;
    const mensajeCliente = '¡Ohh Ohh! Hubo un problema. Intentelo de nuevo enseguida.';
    const resultado = generarErrorCapaPresentation({
      estado: status,
      codigo: 'error-desconocido',
      mensajeServidor: error.message,
      mensajeCliente,
      resultado: error,
    });
    respuestaServidor = {
      exito: false,
      mensaje: mensajeCliente,
      resultado: resultado.toObject(),
    };
  } else {
    status = 500;
    const mensajeCliente = '¡Ohh Ohh! Hubo un problema. Intentelo de nuevo enseguida.';
    const resultado = generarErrorCapaPresentation({
      estado: status,
      codigo: 'error-desconocido',
      mensajeServidor: error.message || '¡Error desconocido! Favor verificar lo antes posible.',
      mensajeCliente,
      resultado: error,
    });
    respuestaServidor = {
      exito: false,
      mensaje: mensajeCliente,
      resultado: resultado.toObject(),
    };
  }

  return {
    status,
    data: generarRespuestaServidor(respuestaServidor),
  };
};
