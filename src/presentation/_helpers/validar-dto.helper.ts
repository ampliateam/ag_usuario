import { validate } from 'class-validator';
import { manejadorDeErrorDTO } from '../_errors';

export const validarDTO = async (dto: any) => {
  try {
    await validate(dto);
  } catch (error) {
    throw manejadorDeErrorDTO(error);
  }
};
