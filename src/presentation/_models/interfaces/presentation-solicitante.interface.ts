import {
  // Usuarios
  IUsuario,
  // Autenticaciones
  IAutenticacionExterno,
  IAutenticacionPersona,
  // Tokens
  ITokenDecodificadoExterno,
  ITokenDecodificadoPersona,
} from '@global/models/ag_usuario';
import { TPresentationSolicitanteTipo } from '@presentation/_models/types';

export interface IPresentationSolicitante {
  tipo: TPresentationSolicitanteTipo;
  token?: string;
  usuario?: {
    datos: IUsuario,
    autenticacionPersona?: IAutenticacionPersona,
    tokenDecodificadoPersona?: ITokenDecodificadoPersona,
    autenticacionExterno?: IAutenticacionExterno,
    tokenDecodificadoExterno?: ITokenDecodificadoExterno,
  };
  extra?: { [key: string]: any };
};
