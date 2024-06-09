import { NextFunction, Request, Response } from "express";
import { services } from "@domain/services";
import { generarRespuestaServicio } from "@presentation/_helpers";
import { OmcActualizarDTO, OmcSolicitudDTO } from "@presentation/entidad/persona/models/dto";

export const omcSolicitud = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const omcSolicitudDTO = req.body as OmcSolicitudDTO;
    const { correo } = omcSolicitudDTO;

    const resultado =
      await services.core.autenticacionPersona.olvideMiContrasena.crear({
        correo,
        fechaCreacion: req.personalizado.momentoSolicitud,
      });

    // TODO: Enviar correo: SOLICITUD OLVIDE MI CONTRASENA
    console.log('resultado', resultado);

    // Retornar respuesta
    generarRespuestaServicio({
      estado: 200,
      codigo: "exito",
      mensaje: "Se encontró el usuario de manera correcta!",
      resultado,
    }).enviar(res);
  } catch (error) {
    next(error);
  }
};

export const omcActualizar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { contrasena } = req.body as OmcActualizarDTO;
    const { decoded, usuario } = req.personalizado.jwtDecoded;
    const resultado = null;

    // Aprobacion de la solicitud
    await services
    .core
    .autenticacionPersona
    .olvideMiContrasena
    .actualizar(decoded.uidSolicitudOmc, 'aprobado');

    // Actualizacion de la contrasena
    await services.core.autenticacionPersona.crud.actualizar({
      buscarPor: { uid: decoded.uidUsuario },
      actualizado: { contrasena },
    })

    // TODO: Enviar correo: AVISO DE ACTUALIZACION DE CONTRASENA
    console.log(usuario);

    // Retornar respuesta
    generarRespuestaServicio({
      estado: 200,
      codigo: "exito",
      mensaje: "Se encontró el usuario de manera correcta!",
      resultado,
    }).enviar(res);
  } catch (error) {
    next(error);
  }
};
