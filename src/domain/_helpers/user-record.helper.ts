import { UserRecord } from "firebase-admin/auth";
import { IAutenticacionPersona } from "@global/models/interfaces";

export const userRecordToAutenticacionPersona = (userRecord: UserRecord): IAutenticacionPersona => {
    if (!userRecord) return null;

    return {
        uid: userRecord.uid,
        correo: userRecord.email,
        correoVerificado: userRecord.emailVerified,
        deshabilitado: userRecord.disabled,
        fechaActividad: {
            fechaCreacion: new Date(userRecord.metadata.creationTime),
            fechaUltimoInicioSesion: userRecord.metadata.lastSignInTime ? new Date(userRecord.metadata.lastSignInTime) : null,
            fechaUltimoMomentoActivo: userRecord.metadata.lastRefreshTime ? new Date(userRecord.metadata.lastRefreshTime) : null
        },
        contrasena: {
            salt: userRecord.passwordSalt || null,
            hash: userRecord.passwordHash || null
        },
        datosProveedor: userRecord.providerData.map(v => {
            return {
                uid: v.uid,
                nombre: v.displayName,
                correo: v.email,
                fotoPerfil: v.photoURL,
                proveedorID: v.providerId,
                telefono: v.phoneNumber
            }
        }),
        fechaVencimientoToken: userRecord.tokensValidAfterTime ? new Date(userRecord.tokensValidAfterTime) : null,
        firebaseAuthentication: { userRecord }
    };
}

export const autenticacionPersonaToUserRecord = (autenticacionPersona: IAutenticacionPersona): UserRecord => {
    return autenticacionPersona?.firebaseAuthentication?.userRecord || null;
}
