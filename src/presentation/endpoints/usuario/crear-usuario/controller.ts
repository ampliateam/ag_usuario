import { NextFunction, Request, Response } from "express";
import { services } from "@domain/services";
import { generarRespuestaServidor } from "@presentation/_helpers";

export const crearUsuario = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { dto } = req.personalizado.extra;

    const autenticacionPersona = await services.core.autenticacionPersona.crearConCorreoContrasena({
      correo: dto.correo,
      contrasena: dto.contrasena,
    });

    await services.core.autenticacionExterno.crud.crear({
      nuevo: {
        uid: autenticacionPersona.uid,
        estado: 'deshabilitado',
      }
    });

    const usuario = await services.core.usuario.crud.crear({
      usuario: {
        uid: autenticacionPersona.uid,
        correo: autenticacionPersona.correo,
        codigo: dto.codigo,
        nombre: dto.nombre,
      }
    });

    const respuestaServidor = generarRespuestaServidor({
      exito: true,
      mensaje: 'Se creo el usuario de forma correcta.',
      resultado: usuario,
    });

    res.status(200).json(respuestaServidor);
  } catch (error) {
    next(error);
  }
}
