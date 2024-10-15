import { NextFunction, Request, Response } from 'express';
import { verificarPresentationSolicitante } from '../_helpers';
import { TPresentationSolicitanteTipo } from '@presentation/_models/types';
import { generarErrorCapaPresentation } from '@presentation/_errors';
import { ICredencialUsuario } from '@global/models/_system';

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
      const cu: ICredencialUsuario = { tipo: 'desconocido' };

      // Datos de un `usuario-externo`
      const publicKey = req.header('X-Public-Key') || null;
      const timestamp = req.header('X-Timestamp') || null;
      const signature = req.header('X-Signature') || null;

      // Datos de un `usuario-persona`
      const authorization: string = req.headers['authorization'] as string;
      const idToken = authorization && authorization.split(' ')[0] === 'Bearer'
        ? authorization.split(' ')[1]
        : null;

      // Constantes de verificacion de tipo de solicitud
      const esExterno = publicKey && timestamp && signature;
      const esPersona = !!idToken;

      if (esExterno) {
        cu.tipo = 'externo';

        // Carga los datos para realizar la verificacion del usuario
        cu.externo = {
          publicKey: publicKey,
          timestamp: +timestamp,
          signature: signature,
        };
      } else if (esPersona) {
        cu.tipo = 'persona';
        
        // Carga los datos para realizar la verificacion del usuario
        cu.persona = { token: idToken };
      }

      // Verificar TSP
      if (!config.tps.includes(cu.tipo)) {
        throw generarErrorCapaPresentation({
          estado: 401, 
          codigo: 'no_autorizado', 
          mensajeServidor: `El tipo del PS [${cu.tipo}] no puede realizar esta operación.`, 
          mensajeCliente: 'No tienes permisos para realizar esta operación.', 
          resultado: null
        });
      }

      // Verificar token del solicitante
      const {
        usuario,
        autenticacionPersona,
        autenticacionExterno,
      } = await verificarPresentationSolicitante(cu);

      req.personalizado.presentationSolicitante.cu = cu;
      req.personalizado.presentationSolicitante.usuario = usuario;
      req.personalizado.presentationSolicitante.autenticacionPersona = autenticacionPersona;
      req.personalizado.presentationSolicitante.autenticacionExterno = autenticacionExterno;

      next();
    } catch (error) {
      next(error);
    }
  };
};
