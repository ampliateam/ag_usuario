import { firebaseAuthentication } from "@domain/_connections/firebase";
import { ITokenDecodificadoPersona } from "@global/models/ag_usuario";
import { manejadorDeErrorFirebaseAuthentication } from "@domain/_errors";

export const verificarToken = async (token: string): Promise<ITokenDecodificadoPersona> => {
  try {
    // Verificar el token del usuario
    return await firebaseAuthentication.verifyIdToken(token);
  } catch (error) {
    return manejadorDeErrorFirebaseAuthentication(error);
  }
};
