import { generarErrorCapaDomain } from '@domain/_errors';

export const manejadorDeErrorFirebaseFirestore = (error: any) => {
  const respuesta = manejadorDeError(error);

  // Verificar codigos: Se usa para retornar otros formatos que no sean [ErrorCapaDomain]
  if (respuesta.codigo === 'usuario_no_encontrado') return null;

  throw respuesta;
};

const manejadorDeError = (error: any) => {
  const errorDomain = generarErrorCapaDomain({
    estado: 500,
    codigo: 'error_desconocido',
    mensajeServidor: 'Error desconocido.',
    mensajeCliente: 'Error desconocido.',
    resultado: error,
  });

  return errorDomain;
};
