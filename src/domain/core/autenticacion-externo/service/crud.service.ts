import { IAutenticacionExterno } from '@global/models/interfaces';
import {
    ActualizarAutenticacionExternoDTO,
    CrearAutenticacionExternoDTO,
    EliminarAutenticacionExternoDTO,
    BuscarAutenticacionExternoDTO
} from '../dto';
import * as autenticacionExternoRepository from '../repository';

export const crear = async (dto: CrearAutenticacionExternoDTO): Promise<IAutenticacionExterno> => {
    return await autenticacionExternoRepository.algo.crud.crear(dto);
}

export const obtener = async (dto: BuscarAutenticacionExternoDTO): Promise<IAutenticacionExterno> => {
    return await autenticacionExternoRepository.algo.crud.obtener(dto);
}

export const actualizar = async (dto: ActualizarAutenticacionExternoDTO): Promise<IAutenticacionExterno> => {
    return await autenticacionExternoRepository.algo.crud.actualizar(dto);
}

export const eliminar = async (dto: EliminarAutenticacionExternoDTO): Promise<IAutenticacionExterno> => {
    return await autenticacionExternoRepository.algo.crud.eliminar(dto);
}
