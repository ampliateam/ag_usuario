import {
  // Usuarios
  IUsuario,
  // Autenticaciones
  IAutenticacionExterno,
  IAutenticacionPersona,
} from '@global/models/ag_usuario';
import { TPresentationSolicitanteTipo } from '@presentation/_models/types';

export interface IPresentationSolicitante {
  tipo: TPresentationSolicitanteTipo;
  usuario?: IUsuario
  persona?: {
    autenticacion: IAutenticacionPersona,
    token: string;
  };
  externo?: {
    autenticacion: IAutenticacionExterno,
    identificacion: {
      publicKey: string,
      timestamp: number,
      signature: string,
    },
  };
};
