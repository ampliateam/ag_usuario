import { IOlvideMiContrasenaOpcional } from '@global/models/ag_usuario';

export interface CrearOlvideMiContrasenaDTO {
    olvideMiContrasena: IOlvideMiContrasenaOpcional;
};

export interface BuscarOlvideMiContrasenaDTO {
    id?: string;
    token?: string;
};

export interface ActualizarOlvideMiContrasenaDTO {
    buscarPor: BuscarOlvideMiContrasenaDTO;
    actualizado: IOlvideMiContrasenaOpcional;
};
