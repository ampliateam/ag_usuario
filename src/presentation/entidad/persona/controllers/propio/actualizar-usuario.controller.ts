import { NextFunction, Request, Response } from "express"
import { services } from "@domain/services";
import { generarRespuestaServicio } from "@presentation/_helpers";

export const actualizarUsuario = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { usuario: usuarioPersonaSolicitante } = req.personalizado.solicitante.persona;
        const { usuarioFormateado, autenticacionFormateado } = req.personalizado;

        // Actualizar Autenticacion
        const autenticacionActualizado = await services.core.autenticacionPersona.crud.actualizar({
            buscarPor: { uid: usuarioPersonaSolicitante.uid },
            actualizado: autenticacionFormateado
        });

        // Actualizar Usuario
        const usuarioActualizado = await services.core.usuarioPersona.crud.actualizar({
            buscarPor: { uid: usuarioPersonaSolicitante.uid },
            actualizado: usuarioFormateado
        });

        // Enviar de confirmacion de correo
        if (usuarioFormateado.correo) {
            
        }

        // Retornar respuesta
        generarRespuestaServicio({
            estado: 200,
            codigo: 'exito',
            mensaje: 'Se actualizó un usuario con éxito.',
            resultado: {
                autenticacion: autenticacionActualizado,
                usuario: usuarioActualizado
            }
        })
        .enviar(res);

    } catch (error) {
        next(error);
    }
}
