import {
  ActualizarOlvideMiContrasenaDTO,
  BuscarOlvideMiContrasenaDTO,
  CrearOlvideMiContrasenaDTO
} from '../dto';
import * as repository from '../repository/cloud-firestore';

export const crear = async (dto: CrearOlvideMiContrasenaDTO) => {
  return await repository.crud.crear(dto);
};

export const obtener = async (dto: BuscarOlvideMiContrasenaDTO) => {
  return await repository.crud.obtener(dto);
};

export const actualizar = async (dto: ActualizarOlvideMiContrasenaDTO) => {
  return await repository.crud.actualizar(dto);
};
