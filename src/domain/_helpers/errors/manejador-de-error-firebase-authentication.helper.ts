import { generarErrorCapaDomain } from '@domain/_helpers/errors';

export const manejadorDeErrorFirebaseAuthentication = (error) => {
    const respuesta = manejadorDeError(error);
    
    // Verificar codigos
    if (respuesta.codigo === 'usuario_no_encontrado') return null;

    throw respuesta;
}

const manejadorDeError = (error) => {
    const errorDomain = generarErrorCapaDomain({
        estado: 500,
        codigo: 'error_desconocido',
        mensaje: 'Error desconocido.',
        resultado: error
    });

    // https://firebase.google.com/docs/auth/admin/errors?hl=es-419
    if (error.errorInfo.code === 'auth/claims-too-large') {
        
    } else if (error.errorInfo.code === 'auth/email-already-exists') {
        
    } else if (error.errorInfo.code === 'auth/id-token-expired') {
        
    } else if (error.errorInfo.code === 'auth/id-token-revoked') {
        
    } else if (error.errorInfo.code === 'auth/insufficient-permission') {
        
    } else if (error.errorInfo.code === 'auth/internal-error') {

    } else if (error.errorInfo.code === 'auth/invalid-argument') {
        
    } else if (error.errorInfo.code === 'auth/invalid-claims') {
        
    } else if (error.errorInfo.code === 'auth/invalid-continue-uri') {
        
    } else if (error.errorInfo.code === 'auth/invalid-creation-time') {
        
    } else if (error.errorInfo.code === 'auth/invalid-credential') {
        
    } else if (error.errorInfo.code === 'auth/invalid-disabled-field') {
        
    } else if (error.errorInfo.code === 'auth/invalid-display-name') {
        
    } else if (error.errorInfo.code === 'auth/invalid-dynamic-link-domain') {
        
    } else if (error.errorInfo.code === 'auth/invalid-email') {
        
    } else if (error.errorInfo.code === 'auth/invalid-email-verified') {
        
    } else if (error.errorInfo.code === 'auth/invalid-hash-algorithm') {
        
    } else if (error.errorInfo.code === 'auth/invalid-hash-block-size') {
        
    } else if (error.errorInfo.code === 'auth/invalid-hash-derived-key-length') {
        
    } else if (error.errorInfo.code === 'auth/invalid-hash-key') {
        
    } else if (error.errorInfo.code === 'auth/invalid-hash-memory-cost') {
        
    } else if (error.errorInfo.code === 'auth/invalid-hash-parallelization') {
        
    } else if (error.errorInfo.code === 'auth/invalid-hash-rounds') {
        
    } else if (error.errorInfo.code === 'auth/invalid-hash-salt-separator') {
        
    } else if (error.errorInfo.code === 'auth/invalid-id-token') {
        errorDomain.estado = 401;
        errorDomain.codigo = 'token_persona_invalido';
        errorDomain.mensaje = 'El token proporcionado no es válido. Debe ser un token de usuario tipo persona.';
    } else if (error.errorInfo.code === 'auth/invalid-last-sign-in-time') {
        
    } else if (error.errorInfo.code === 'auth/invalid-page-token') {
        
    } else if (error.errorInfo.code === 'auth/invalid-password') {
        
    } else if (error.errorInfo.code === 'auth/invalid-password-hash') {
        
    } else if (error.errorInfo.code === 'auth/invalid-password-salt') {
        
    } else if (error.errorInfo.code === 'auth/invalid-phone-number') {
        
    } else if (error.errorInfo.code === 'auth/invalid-photo-url') {
        
    } else if (error.errorInfo.code === 'auth/invalid-provider-data') {
        
    } else if (error.errorInfo.code === 'auth/invalid-provider-id') {
        
    } else if (error.errorInfo.code === 'auth/invalid-oauth-responsetype') {
        
    } else if (error.errorInfo.code === 'auth/invalid-session-cookie-duration') {
        
    } else if (error.errorInfo.code === 'auth/invalid-uid') {
        
    } else if (error.errorInfo.code === 'auth/invalid-user-import') {
        
    } else if (error.errorInfo.code === 'auth/maximum-user-count-exceeded') {
        
    } else if (error.errorInfo.code === 'auth/missing-android-pkg-name') {
        
    } else if (error.errorInfo.code === 'auth/missing-continue-uri') {
        
    } else if (error.errorInfo.code === 'auth/missing-hash-algorithm') {
        
    } else if (error.errorInfo.code === 'auth/missing-ios-bundle-id') {
        
    } else if (error.errorInfo.code === 'auth/missing-uid') {
        
    } else if (error.errorInfo.code === 'auth/missing-oauth-client-secret') {
        
    } else if (error.errorInfo.code === 'auth/operation-not-allowed') {
        
    } else if (error.errorInfo.code === 'auth/phone-number-already-exists') {
        
    } else if (error.errorInfo.code === 'auth/project-not-found') {
        
    } else if (error.errorInfo.code === 'auth/reserved-claims') {
        
    } else if (error.errorInfo.code === 'auth/session-cookie-expired') {
        
    } else if (error.errorInfo.code === 'auth/session-cookie-revoked') {
        
    } else if (error.errorInfo.code === 'auth/too-many-requests') {
        
    } else if (error.errorInfo.code === 'auth/uid-already-exists') {
        
    } else if (error.errorInfo.code === 'auth/unauthorized-continue-uri') {
        
    } else if (error.errorInfo.code === 'auth/user-not-found') {
        errorDomain.estado = 403;
        errorDomain.codigo = 'usuario_no_encontrado';
        errorDomain.mensaje = 'No se pudo encontrar el usuario.';
    }

    return errorDomain;
}