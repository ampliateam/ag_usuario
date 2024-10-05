import { IAutenticacionPersona } from '@global/models/ag_usuario'
import {
    ActualizarAutenticacionPersonaDTO,
    EliminarAutenticacionPersonaDTO,
    BuscarAutenticacionPersonaDTO
} from '../dto';
import * as repository from '../repository/firebase-authentication';

export const obtener = async (dto: BuscarAutenticacionPersonaDTO): Promise<IAutenticacionPersona> => {
    return await repository.crud.obtener(dto);
};

export const actualizar = async (dto: ActualizarAutenticacionPersonaDTO): Promise<IAutenticacionPersona> => {
    return await repository.crud.actualizar(dto);
};

export const eliminar = async (dto: EliminarAutenticacionPersonaDTO): Promise<IAutenticacionPersona> => {
    return await repository.crud.eliminar(dto);
};
