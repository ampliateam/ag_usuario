import { IUsuario } from '@global/models/ag_usuario';
import {
    CrearUsuarioDTO,
    BuscarUsuarioDTO,
    ActualizarUsuarioDTO
} from '../dto';
import * as repository from '../repository';

export const crear = async (dto: CrearUsuarioDTO): Promise<IUsuario> => {
    return await repository.cloudFirestore.crud.crear(dto);
};

export const obtener = async (dto: BuscarUsuarioDTO): Promise<IUsuario> => {
    return await repository.cloudFirestore.crud.obtener(dto);
};

export const actualizar = async (dto: ActualizarUsuarioDTO): Promise<IUsuario> => {
    return await repository.cloudFirestore.crud.actualizar(dto);
};
