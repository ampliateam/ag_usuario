import { NextFunction, Request, Response } from 'express';
import { verificarPresentationSolicitante } from '../_helpers';
import { TPresentationSolicitanteTipo } from '@presentation/_models/types';
import { generarErrorCapaPresentation } from '@presentation/_errors';

interface IConfigVerificarPresentationSolicitante {
  tps?: TPresentationSolicitanteTipo[];
  obtenerUsuario?: boolean;
  obtenerAutenticacion?: boolean;
};

export const mwVerificarPS = (config: IConfigVerificarPresentationSolicitante = {}) => {
  // Si no existe 'TPS', entonces esta disponible para que cualquier cliente pueda consultar
  const noExisteTPS = !config?.tps || !config?.tps?.length;
  if (noExisteTPS) config.tps = ['desconocido', 'persona', 'externo'];

  // Middleware de autorizacion de usuario
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      let tipoPS: TPresentationSolicitanteTipo = 'desconocido';
      let idToken = '';
      const authorization: string = req.headers['authorization'] as string;
      const idTokenConTipo = authorization && authorization.split(' ')[0] === 'Bearer'
        ? authorization.split(' ')[1]
        : '';

      if (idTokenConTipo) {
        const esExterno = idTokenConTipo.startsWith('externo:');

        // Seleccionar el tipo de PresentationSolicitante
        tipoPS = !esExterno ? 'persona' : 'externo';
        
        // Obtener el idToken
        idToken = esExterno
        ? idTokenConTipo.substring(8)
        : idTokenConTipo;
      }

      // Verificar TSP
      if (!config.tps.includes(tipoPS)) {
        throw generarErrorCapaPresentation({
          estado: 401, 
          codigo: 'no_autorizado', 
          mensajeServidor: `El tipo del PS [${tipoPS}] no puede realizar esta operación.`, 
          mensajeCliente: 'No tienes permisos para realizar esta operación.', 
          resultado: null
        });
      }

      // Verificar token del solicitante
      const {
        usuario,
        tokenDecodificadoPersona,
        tokenDecodificadoExterno,
        autenticacionPersona,
        autenticacionExterno,
      } = await verificarPresentationSolicitante(tipoPS, idToken);

      // Construccion del solicitante
      if (tipoPS !== 'desconocido') {
        req.personalizado.presentationSolicitante.tipo = tipoPS;
        req.personalizado.presentationSolicitante.token = idToken;
        req.personalizado.presentationSolicitante.usuario = {
          datos: usuario,
          autenticacionPersona,
          autenticacionExterno,
          tokenDecodificadoPersona,
          tokenDecodificadoExterno,
        };
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
