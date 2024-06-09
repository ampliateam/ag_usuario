import { IAutenticacionPersona } from "@global/models/interfaces";
import { firebaseAuthentication } from "@domain/_connections/firebase";
import { userRecordToAutenticacionPersona } from "@domain/_helpers";
import { manejadorDeErrorFirebaseAuthentication } from "@domain/_helpers/errors";
import { CrearConCorreoContrasenaDTO } from "../../dto";

export const crearConCorreoContrasena = async (dto: CrearConCorreoContrasenaDTO): Promise<IAutenticacionPersona> => {
    try {
        const userRecord = await firebaseAuthentication.createUser({
            email: dto.correo,
            password: dto.contrasena
        });
    
        // Parsea el objeto "UserRecord" a "AutenticacionPersona"
        return userRecordToAutenticacionPersona(userRecord);
    } catch (error) {
        return manejadorDeErrorFirebaseAuthentication(error);
    }
}
