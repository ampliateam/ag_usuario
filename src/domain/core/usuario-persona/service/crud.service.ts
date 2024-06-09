import { IUsuarioPersona } from '@global/models/interfaces';
import {
    CrearUsuarioPersonaDTO,
    BuscarUsuarioPersonaDTO,
    ActualizarUsuarioPersonaDTO
} from '../dto';
import * as usuarioPersonaRepository from '../repository';

export const crear = async (dto: CrearUsuarioPersonaDTO): Promise<IUsuarioPersona> => {
    return await usuarioPersonaRepository.cloudFirestore.crud.crear(dto);
}

export const obtener = async (dto: BuscarUsuarioPersonaDTO): Promise<IUsuarioPersona> => {
    return await usuarioPersonaRepository.cloudFirestore.crud.obtener(dto);
}

export const actualizar = async (dto: ActualizarUsuarioPersonaDTO): Promise<IUsuarioPersona> => {
    return await usuarioPersonaRepository.cloudFirestore.crud.actualizar(dto);
}
