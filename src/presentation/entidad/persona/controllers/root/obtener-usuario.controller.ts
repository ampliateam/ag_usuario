import { NextFunction, Request, Response } from "express"
import { services } from "@domain/services";
import { generarRespuestaServicio } from "@presentation/_helpers";
import { generarErrorCapaPresentacion } from "@presentation/_helpers/errors";

export const obtenerUsuario = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const solicitanteTipo = req.personalizado.solicitante.tipo;
        const usuarioPersona = req.personalizado?.solicitante?.persona?.usuario || null;
        const { tipo, valor } = req.params;
        const resultado = { autenticacion: null, usuario: null };

        if (!['uid', 'correo', 'codigo'].includes(tipo) || !valor) {
            throw generarErrorCapaPresentacion({
                estado: 400, 
                codigo: 'dato_incorrecto', 
                mensaje: 'No se colocaron los datos correspondientes.', 
                resultado: null
            });
        }

        const condicionDeBusqueda = {};
        condicionDeBusqueda[tipo] = valor;
        resultado.usuario = await services.core.usuarioPersona.crud.obtener(condicionDeBusqueda);
        
        // Verificar si el solicitante es el propietario del usuario
        if (resultado.usuario) {
            const datosDeLaPersonaSolicitante = solicitanteTipo === 'persona' && usuarioPersona.uid === resultado.usuario.uid;
            if (datosDeLaPersonaSolicitante) {
                resultado.autenticacion = await services.core.autenticacionPersona.crud.obtener({ uid: resultado.usuario.uid });

                delete resultado.autenticacion.contrasena;
                delete resultado.autenticacion.firebaseAuthentication;
            } else {
                // Eliminacion de datos de Autenticacion
                resultado.autenticacion = null;
                
                // Eliminacion de datos de Usuario
                resultado.usuario.correo = null;
                resultado.usuario.correoVerificado = null;
            }
        }

        // Retornar respuesta
        generarRespuestaServicio({
            estado: 200,
            codigo: 'exito',
            mensaje: 'Se encontró el usuario de manera correcta!',
            resultado
        })
        .enviar(res);

    } catch (error) {
        next(error);
    }
}
