import {
    IAutenticacionPersona,
    IAutenticacionExterno,
    ITokenDecodificadoPersona,
    ITokenDecodificadoExterno,
    IUsuarioPersona,
    IUsuarioExterno
} from "@global/models/interfaces";
import { TSolicitanteTipo } from "@global/models/types";

interface Personalizado {
    momentoSolicitud?: Date;
    solicitante?: {
        tipo: TSolicitanteTipo,
        desconocido?: {},
        persona?: {
            tokenDecodificado: ITokenDecodificadoPersona;
            autenticacion: IAutenticacionPersona;
            usuario: IUsuarioPersona;
        },
        externo?: {
            tokenDecodificado: ITokenDecodificadoExterno;
            autenticacion: IAutenticacionExterno;
            usuario: IUsuarioExterno;
        },
    };
    [key: string]: any;
}

declare global {
    namespace Express {
        interface Request {
            personalizado?: Personalizado;
        }
    }
}