import { constants } from '@global/configs/constants';
import { ErrorCapaGlobal, IErrorCapaGlobalOpcional } from '@global/models/_system';

export const generarErrorCapaPresentation = (error: IErrorCapaGlobalOpcional): ErrorCapaGlobal => {
  return new ErrorCapaGlobal({
    ref: error.ref || `agendalia/${constants.codigoServicioPrincipal}/presentation`,
    estado: error.estado || 500,
    codigo: error.codigo || 'error_desconocido',
    mensajeServidor: error.mensajeServidor || 'Error desconocido.',
    mensajeCliente: error.mensajeCliente || 'Error desconocido.',
    resultado: error.resultado || null,
  });
};
