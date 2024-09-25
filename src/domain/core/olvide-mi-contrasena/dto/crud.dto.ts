import { IOlvideMiContrasenaOpcional } from '@global/models/interfaces';

export interface CrearOlvideMiContrasenaDTO {
    olvideMiContrasena: IOlvideMiContrasenaOpcional;
};

export interface BuscarOlvideMiContrasenaDTO {
    id?: string;
};

export interface ActualizarOlvideMiContrasenaDTO {
    buscarPor: BuscarOlvideMiContrasenaDTO;
    actualizado: IOlvideMiContrasenaOpcional;
};
