import { IAutenticacionPersona } from '@global/models/ag_usuario'
import { CrearConCorreoContrasenaDTO } from '../dto';
import * as repository from '../repository/firebase-authentication';

export const crearConCorreoContrasena = async (dto: CrearConCorreoContrasenaDTO): Promise<IAutenticacionPersona> => {
    return await repository.crearConCorreoContrasena(dto);
};
