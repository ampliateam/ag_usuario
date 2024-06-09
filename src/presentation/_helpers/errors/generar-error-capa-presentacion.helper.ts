import { ErrorCapaPresentacion } from "@presentation/_models";
import { IErrorCapaPresentacion } from "@presentation/_models/interfaces";

export const generarErrorCapaPresentacion = (
  errorCapaPresentacion: IErrorCapaPresentacion
): ErrorCapaPresentacion => {
  return new ErrorCapaPresentacion({
    estado: errorCapaPresentacion.estado,
    codigo: errorCapaPresentacion.codigo,
    mensaje: errorCapaPresentacion.mensaje,
    resultado: errorCapaPresentacion.resultado,
  });
};
