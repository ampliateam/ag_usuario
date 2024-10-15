import { constants } from '@global/configs/constants';
import { IRespuestaServidor, IRespuestaServidorOpcional } from '@presentation/_models/interfaces';

export const generarRespuestaServidor = (respuestaServidor: IRespuestaServidorOpcional): IRespuestaServidor => {
  return {
    exito: respuestaServidor.exito,
    mensaje: respuestaServidor.mensaje,
    resultado: respuestaServidor.resultado,
    nombreServicio: respuestaServidor.nombreServicio || constants.codigoServicioPrincipal,
  };
};
