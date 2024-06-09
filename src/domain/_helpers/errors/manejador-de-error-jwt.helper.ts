import { generarErrorCapaDomain } from "@domain/_helpers/errors";

export const manejadorDeErrorJWT = (error) => {
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

    return errorDomain;
}