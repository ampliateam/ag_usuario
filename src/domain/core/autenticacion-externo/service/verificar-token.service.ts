import { ITokenDecodificadoExterno } from "@global/models/interfaces";
import * as autenticacionExternoRepository from '../repository';

export const verificarToken = async (token: string): Promise<ITokenDecodificadoExterno> => {
    return await autenticacionExternoRepository.algo.verificarToken(token);
}
