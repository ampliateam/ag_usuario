import { Response } from 'express';
import { IRespuestaServicio } from './interfaces';
import { constants } from '@global/configs/constants';

export class RespuestaServicio implements IRespuestaServicio {
  public estado: number;
  public codigo: string;
  public mensaje?: string = 'Sin mensaje';
  public resultado?: any = null;
  public nombreServicio?: string = constants.codigoServicioPrincipal;

  constructor (params: IRespuestaServicio) {
    this.estado = params.estado;
    this.codigo = params.codigo;
    this.mensaje = params.mensaje;
    this.resultado = params.resultado;
    this.nombreServicio = params.nombreServicio;
  }

  obtenerRespuestaServicio(): IRespuestaServicio {
    return {
      estado: this.estado,
      codigo: this.codigo,
      mensaje: this.mensaje,
      resultado: this.resultado,
      nombreServicio: this.nombreServicio ? this.nombreServicio : constants.codigoServicioPrincipal
    }
  }

  enviar(res: Response): void {
    res.status(this.estado).json(this.obtenerRespuestaServicio());
  }
}