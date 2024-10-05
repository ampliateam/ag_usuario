import { IAutenticacionExternoOpcional } from "@global/models/ag_usuario";

export interface CrearAutenticacionExternoDTO {
  nuevo: IAutenticacionExternoOpcional;
}

export interface BuscarAutenticacionExternoDTO {
  uid?: string;
  clavePublica?: string;
  clavePrivada?: string;
}

export interface ActualizarAutenticacionExternoDTO {
  buscarPor: BuscarAutenticacionExternoDTO;
  actualizado: IAutenticacionExternoOpcional;
}
