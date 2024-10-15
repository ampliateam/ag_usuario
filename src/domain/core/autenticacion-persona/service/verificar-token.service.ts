import { ITokenDecodificadoPersona } from '@global/models/ag_usuario';
import * as repository from '../repository/firebase-authentication';

export const verificarToken = async (token: string): Promise<ITokenDecodificadoPersona> => {
    return await repository.verificarToken(token);
};
