import { firebaseAuthentication } from "@domain/_connections/firebase";
import { ITokenDecodificadoPersona } from "@global/models/interfaces";
import { manejadorDeErrorFirebaseAuthentication } from "@domain/_helpers/errors";

export const verificarToken = async (token: string): Promise<ITokenDecodificadoPersona> => {
    try {
        return await firebaseAuthentication.verifyIdToken(token);
    } catch (error) {
        return manejadorDeErrorFirebaseAuthentication(error);
    }
}
