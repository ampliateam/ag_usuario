import { TOlvideMiContrasenaEstado } from '@global/models/ag_usuario';

export interface IOlvideMiContrasena {
  id: string;
  uidUsuario: string;
  token: string;
  estado: TOlvideMiContrasenaEstado;
  fechaCreacion: Date;
};

export interface IOlvideMiContrasenaOpcional {
  id?: string;
  uidUsuario?: string;
  token?: string;
  estado?: TOlvideMiContrasenaEstado;
  fechaCreacion?: Date;
};
