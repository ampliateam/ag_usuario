import { IUsuarioExterno } from '@global/models/interfaces';
import {
    CrearUsuarioExternoDTO,
    BuscarUsuarioExternoDTO,
    ActualizarUsuarioExternoDTO,
    EliminarUsuarioExternoDTO
} from '../dto';
import * as usuarioExternoRepository from '../repository';

export const crear = async (dto: CrearUsuarioExternoDTO): Promise<IUsuarioExterno> => {
    return await usuarioExternoRepository.algo.crud.crear(dto);
}

export const obtener = async (dto: BuscarUsuarioExternoDTO): Promise<IUsuarioExterno> => {
    return await usuarioExternoRepository.algo.crud.obtener(dto);
}

export const actualizar = async (dto: ActualizarUsuarioExternoDTO): Promise<IUsuarioExterno> => {
    return await usuarioExternoRepository.algo.crud.actualizar(dto);
}

export const eliminar = async (dto: EliminarUsuarioExternoDTO): Promise<IUsuarioExterno> => {
    return await usuarioExternoRepository.algo.crud.eliminar(dto);
}
