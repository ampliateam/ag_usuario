import { generarErrorCapaPresentation } from './generar-error-capa-presentation.helper';

export const manejadorDeErrorDTO = (error: any) => {
  console.log('error-dto', error);

  return generarErrorCapaPresentation({
    estado: 400,
    codigo: 'error_dto',
    mensajeServidor: 'Error en dto.',
    mensajeCliente: 'Error en dto.',
    resultado: JSON.stringify(error),
  });
};
