import { NextFunction, Request, Response } from "express"
import { services } from "@domain/services";
import { generarRespuestaServicio } from "@presentation/_helpers";
import { CrearUsuarioDTO } from "@presentation/entidad/persona/models/dto";

export const crearUsuario = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { contrasena } = req.body as CrearUsuarioDTO;
        const { usuarioFormateado } = req.personalizado;

        // Crear Autenticacion
        const autenticacionPersona = await services.core.autenticacionPersona.crearConCorreoContrasena({
            correo: usuarioFormateado.correo,
            contrasena
        });

        // Crear Usuario
        usuarioFormateado.uid = autenticacionPersona.uid;
        usuarioFormateado.fechaCreacion = autenticacionPersona.fechaActividad.fechaCreacion;
        const usuario = await services.core.usuarioPersona.crud.crear({usuario: usuarioFormateado});

        // Enviar de confirmacion de correo

        // Crear plan del usuario

        // Retornar respuesta
        generarRespuestaServicio({
            estado: 200,
            codigo: 'exito',
            mensaje: 'Se creó un usuario con éxito.',
            resultado: {
                autenticacion: autenticacionPersona,
                usuario
            }
        })
        .enviar(res);

    } catch (error) {
        next(error);
    }
}
