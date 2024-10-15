import { IParametroSistemaOpcional } from '@global/models/ag_usuario';

export interface CrearParametroSistemaDTO {
    nuevo: IParametroSistemaOpcional;
};

export interface BuscarParametroSistemaDTO {
    id?: string;
    parametroBusqueda?: string;
};

export interface ActualizarParametroSistemaDTO {
    buscarPor: BuscarParametroSistemaDTO;
    actualizado: IParametroSistemaOpcional;
};
