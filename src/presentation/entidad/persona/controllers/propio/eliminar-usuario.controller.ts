import { NextFunction, Request, Response } from "express"
import { services } from "@domain/services";
import { generarRespuestaServicio } from "@presentation/_helpers";

export const eliminarUsuario = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { usuario: usuarioPersonaSolicitante } = req.personalizado.solicitante.persona;

        // Eliminar Autenticacion
        const autenticacionEliminado = await services.core.autenticacionPersona.crud.eliminar({
            buscarPor: { uid: usuarioPersonaSolicitante.uid }
        });

        // Eliminar Usuario
        const usuarioEliminado = await services.core.usuarioPersona.eliminarLogicamente({
            buscarPor: { uid: usuarioPersonaSolicitante.uid },
            fechaEliminacion: req.personalizado.momentoSolicitud
        });

        // Enviar de notificacion de eliminacion
        if (usuarioPersonaSolicitante.correo) {
            
        }

        // Retornar respuesta
        generarRespuestaServicio({
            estado: 200,
            codigo: 'exito',
            mensaje: 'Se eliminó el usuario con éxito.',
            resultado: {
                autenticacion: autenticacionEliminado,
                usuario: usuarioEliminado
            }
        })
        .enviar(res);

    } catch (error) {
        next(error);
    }
}
