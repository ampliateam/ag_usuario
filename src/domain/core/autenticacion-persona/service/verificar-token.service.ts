import { ITokenDecodificadoPersona } from "@global/models/interfaces";
import * as autenticacionPersonaRepository from '../repository';

export const verificarToken = async (token: string): Promise<ITokenDecodificadoPersona> => {
    return await autenticacionPersonaRepository.firebaseAuthentication.verificarToken(token);
}
