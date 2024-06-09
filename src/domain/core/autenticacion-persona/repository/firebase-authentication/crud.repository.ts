import { IAutenticacionPersona } from '@global/models/interfaces'
import { firebaseAuthentication } from '@domain/_connections/firebase';
import {
    ActualizarAutenticacionPersonaDTO,
    EliminarAutenticacionPersonaDTO,
    BuscarAutenticacionPersonaDTO
} from "../../dto";
import { autenticacionPersonaToUserRecord, userRecordToAutenticacionPersona } from '@domain/_helpers';
import { manejadorDeErrorFirebaseAuthentication } from '@domain/_helpers/errors';

export const obtener = async (dto: BuscarAutenticacionPersonaDTO): Promise<IAutenticacionPersona> => {
    try {
        let userRecord = null;
    
        // Obtener el userRecord de Firebase Authentication
        if (dto.uid) userRecord = await firebaseAuthentication.getUser(dto.uid);
        else if (dto.correo) userRecord = await firebaseAuthentication.getUserByEmail(dto.correo);
        else return null;

        // Si no existe el usuario se retorna null
        if (!userRecord) return null;
        
        // Parsea el objeto "UserRecord" a "AutenticacionPersona"
        return userRecordToAutenticacionPersona(userRecord);
    } catch (error) {
        return manejadorDeErrorFirebaseAuthentication(error);
    }
}

export const actualizar = async (dto: ActualizarAutenticacionPersonaDTO): Promise<IAutenticacionPersona> => {
    try {
        const { buscarPor, actualizado } = dto;
        const actualizadoFirebaseAuthentication: any = {};
        
        const autenticacionPersona = await obtener(buscarPor);
        const userRecord = autenticacionPersonaToUserRecord(autenticacionPersona);
        
        // Si no existe el usuario se retorna null
        if (!userRecord) return null;

        if (actualizado.contrasena !== undefined) actualizadoFirebaseAuthentication.password = actualizado.contrasena;
        if (actualizado.correo !== undefined) actualizadoFirebaseAuthentication.email = actualizado.correo;
        if (actualizado.correoVerificado !== undefined) actualizadoFirebaseAuthentication.emailVerified = actualizado.correoVerificado;
        if (actualizado.deshabilitado !== undefined) actualizadoFirebaseAuthentication.disabled = actualizado.deshabilitado;

        const userRecordActualizado = await firebaseAuthentication.updateUser(
            userRecord.uid,
            actualizadoFirebaseAuthentication
        );

        // Parsea el objeto "UserRecord" a "AutenticacionPersona"
        return userRecordToAutenticacionPersona(userRecordActualizado);
    } catch (error) {
        return manejadorDeErrorFirebaseAuthentication(error);
    }
}

export const eliminar = async (dto: EliminarAutenticacionPersonaDTO): Promise<IAutenticacionPersona> => {
    try {
        const { buscarPor } = dto;

        const autenticacionPersona = await obtener(buscarPor);
        const userRecord = autenticacionPersonaToUserRecord(autenticacionPersona);

        // Si no existe el usuario se retorna null
        if (!userRecord) return null;

        await firebaseAuthentication.deleteUser(userRecord.uid);

        // Parsea el objeto "UserRecord" a "AutenticacionPersona"
        return userRecordToAutenticacionPersona(userRecord);
    } catch (error) {
        return manejadorDeErrorFirebaseAuthentication(error);
    }
}
