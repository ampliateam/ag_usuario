import { IAutenticacionPersona } from '@global/models/interfaces'
import {
    ActualizarAutenticacionPersonaDTO,
    EliminarAutenticacionPersonaDTO,
    BuscarAutenticacionPersonaDTO
} from "../dto";
import * as autenticacionPersonaRepository from '../repository';

export const obtener = async (dto: BuscarAutenticacionPersonaDTO): Promise<IAutenticacionPersona> => {
    return await autenticacionPersonaRepository.firebaseAuthentication.crud.obtener(dto);
}

export const actualizar = async (dto: ActualizarAutenticacionPersonaDTO): Promise<IAutenticacionPersona> => {
    return await autenticacionPersonaRepository.firebaseAuthentication.crud.actualizar(dto);
}

export const eliminar = async (dto: EliminarAutenticacionPersonaDTO): Promise<IAutenticacionPersona> => {
    return await autenticacionPersonaRepository.firebaseAuthentication.crud.eliminar(dto);
}
