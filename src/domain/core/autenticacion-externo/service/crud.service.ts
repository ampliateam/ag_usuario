import { IAutenticacionExterno } from '@global/models/ag_usuario';
import {
    ActualizarAutenticacionExternoDTO,
    CrearAutenticacionExternoDTO,
    BuscarAutenticacionExternoDTO
} from '../dto';
import * as repository from '../repository/algo';

export const crear = async (dto: CrearAutenticacionExternoDTO): Promise<IAutenticacionExterno> => {
    return await repository.crud.crear(dto);
}

export const obtener = async (dto: BuscarAutenticacionExternoDTO): Promise<IAutenticacionExterno> => {
    return await repository.crud.obtener(dto);
}

export const actualizar = async (dto: ActualizarAutenticacionExternoDTO): Promise<IAutenticacionExterno> => {
    return await repository.crud.actualizar(dto);
}
