import { constants } from "@global/configs/constants";
import { RespuestaServicio } from "@presentation/_models";
import { IRespuestaServicio } from "@presentation/_models/interfaces";

export const generarRespuestaServicio = (
  respuestaServicio: IRespuestaServicio
): RespuestaServicio => {
  const nombreServicio = respuestaServicio.nombreServicio
    ? respuestaServicio.nombreServicio
    : constants.codigoServicioPrincipal;

  const respuestaServicioGenerado = new RespuestaServicio({
    estado: respuestaServicio.estado,
    codigo: respuestaServicio.codigo,
    mensaje: respuestaServicio.mensaje,
    resultado: respuestaServicio.resultado,
    nombreServicio,
  });

  return respuestaServicioGenerado;
};
