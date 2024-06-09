import { IErrorCapaPresentacion } from "./interfaces";

export class ErrorCapaPresentacion extends Error implements IErrorCapaPresentacion {
    public estado: number;
    public codigo: string;
    public mensaje: string;
    public resultado?: any;

    constructor (params: IErrorCapaPresentacion) {
        super(params.mensaje);
        
        this.estado = params.estado;
        this.codigo = params.codigo;
        this.mensaje = params.mensaje;
        this.resultado = params.resultado;
    }
}