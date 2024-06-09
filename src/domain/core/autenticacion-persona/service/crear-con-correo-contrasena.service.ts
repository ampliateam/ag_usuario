import { IAutenticacionPersona } from '@global/models/interfaces'
import { CrearConCorreoContrasenaDTO } from '../dto';
import * as autenticacionPersonaRepository from '../repository';

export const crearConCorreoContrasena = async (dto: CrearConCorreoContrasenaDTO): Promise<IAutenticacionPersona> => {
    return await autenticacionPersonaRepository.firebaseAuthentication.crearConCorreoContrasena(dto);
}
