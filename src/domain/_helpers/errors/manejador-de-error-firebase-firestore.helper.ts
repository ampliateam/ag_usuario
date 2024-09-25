import { generarErrorCapaDomain } from '@domain/_helpers/errors';

export const manejadorDeErrorFirebaseFirestore = (error) => {
    const respuesta = manejadorDeError(error);

    // Verificar codigos: Se usa para retornar otros formatos que no sean [ErrorCapaDomain]
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