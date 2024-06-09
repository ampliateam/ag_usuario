import { ITokenDecodificadoExterno } from "@global/models/interfaces";
import { manejadorDeErrorJWT } from "@domain/_helpers/errors";

export const verificarToken = async (token: string): Promise<ITokenDecodificadoExterno> => {
    try {
        return null;
    } catch (error) {
        return manejadorDeErrorJWT(error);
    }
}
