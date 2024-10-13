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
      const dataAuth: any = {};

      // Datos de un `usuario-externo`
      const publicKey = req.header('X-Public-Key');
      const timestamp = req.header('X-Timestamp');
      const signature = req.header('X-Signature');
      
      // Datos de un `usuario-persona`
      const authorization: string = req.headers['authorization'] as string;
      const idToken = authorization && authorization.split(' ')[0] === 'Bearer'
        ? authorization.split(' ')[1]
        : '';

      // Constantes de verificacion de tipo de solicitud
      const esExterno = publicKey && timestamp && signature;
      const esPersona = !!idToken;

      if (esExterno) {
        tipoPS = 'externo';

        // Carga los datos para realizar la verificacion del usuario
        dataAuth.publicKey = publicKey;
        dataAuth.timestamp = +timestamp;
        dataAuth.signature = signature;
      } else if (esPersona) {
        tipoPS = 'persona';

        // Carga los datos para realizar la verificacion del usuario
        dataAuth.token = idToken;        
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
        autenticacionPersona,
        autenticacionExterno,
      } = await verificarPresentationSolicitante(tipoPS, dataAuth);

      req.personalizado.presentationSolicitante.tipo = tipoPS;
      req.personalizado.presentationSolicitante.usuario = usuario;

      // Construccion del solicitante
      if (tipoPS !== 'desconocido') {
        tipoPS === 'persona' ? req.personalizado.presentationSolicitante.persona = {
          autenticacion: autenticacionPersona,
          token: idToken
        } : '';
        tipoPS === 'externo' ? req.personalizado.presentationSolicitante.externo = {
          autenticacion: autenticacionExterno,
          identificacion: {
            publicKey: dataAuth.publicKey,
            timestamp: dataAuth.timestamp,
            signature: dataAuth.signature,
          }
        } : '';
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
