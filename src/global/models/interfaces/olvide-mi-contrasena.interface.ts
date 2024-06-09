import { TOlvideMiContrasenaEstado } from "@global/models/types";

export interface IOlvideMiContrasena {
  uid: string;
  uidUsuario: string;
  token: string;
  estado: TOlvideMiContrasenaEstado;
  fechaCreacion: string;
}

export interface IOlvideMiContrasenaOpcional {
  uid?: string;
  uidUsuario?: string;
  token?: string;
  estado?: TOlvideMiContrasenaEstado;
  fechaCreacion?: string;
}
