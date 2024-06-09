import { verify as jwtVerify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { envs } from "@global/configs/envs";
import { services } from "@domain/services";
import { validarDTO } from "@presentation/_helpers";
import { generarErrorCapaPresentacion } from "@presentation/_helpers/errors";
import { OmcActualizarDTO, OmcSolicitudDTO } from "@presentation/entidad/persona/models/dto";

export const omcSolicitud = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const omcSolicitudDTO = req.body as OmcSolicitudDTO;
    const { correo } = omcSolicitudDTO;

    await validarDTO(omcSolicitudDTO);

    // Verificar existencia de correo
    const queryUsuarioPorCorreo = services.core.usuarioPersona.crud.obtener({
      correo,
    });
    const usuarioPorCorreo = await queryUsuarioPorCorreo;

    if (!usuarioPorCorreo) {
      throw generarErrorCapaPresentacion({
        estado: 403,
        codigo: "usuario_no_existe",
        mensaje: "No existe el usuario.",
        resultado: null,
      });
    }

    next();
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
    const omcActualizarDTO = req.body as OmcActualizarDTO;
    const { token, contrasena, confirmacionContrasena } = omcActualizarDTO;

    await validarDTO(omcActualizarDTO);

    // Decodificar token
    let usuario = null;
    try {
      const decoded:any = jwtVerify(token, envs.secretKeyTokenCambioContrasena);
      usuario = await services.core.usuarioPersona.crud.obtener({
        uid: decoded.uidUsuario,
      });

      req.personalizado.jwtDecoded = {
        decoded: {
          uidUsuario: decoded.uidUsuario,
          uidSolicitudOmc: decoded.uidSolicitudOmc,
          fechaCreacion: decoded.fechaCreacion,
        },
        usuario,
      };
    } catch (err) {
      console.error('Error decoding token:', err);
    }

    // Verificar existencia del usuario
    if (!usuario) {
      throw generarErrorCapaPresentacion({
        estado: 403,
        codigo: "usuario_no_existe",
        mensaje: "No existe el usuario.",
        resultado: null,
      });
    }

    // Verificar contrasena
    if (contrasena !== confirmacionContrasena) {
        throw generarErrorCapaPresentacion({
            estado: 400, 
            codigo: 'contrasena_diferente_a_confirmacionContrasena', 
            mensaje: '[contrasena] y [confirmacionContrasena] son diferentes.', 
            resultado: null
        })
    }

    next();
  } catch (error) {
    next(error);
  }
};
