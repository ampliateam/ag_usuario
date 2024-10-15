import { ICredencialUsuario } from '@global/models/_system';
import {
  // Usuarios
  IUsuario,
  // Autenticaciones
  IAutenticacionExterno,
  IAutenticacionPersona,
} from '@global/models/ag_usuario';

export interface IPresentationSolicitante {
  cu: ICredencialUsuario,
  usuario?: IUsuario
  autenticacionPersona?: IAutenticacionPersona,
  autenticacionExterno?: IAutenticacionExterno,
};
