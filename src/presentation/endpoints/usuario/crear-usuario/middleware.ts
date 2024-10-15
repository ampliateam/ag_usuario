import { NextFunction, Request, Response } from "express";
import { validarDTO } from "@presentation/_helpers";
import { generarErrorCapaPresentation } from "@presentation/_errors";
import { CrearUsuarioDTO } from "./dto";

export const verificarCreacionUsuario = (req: Request, res: Response, next: NextFunction) => {
  try {
    const dto = new CrearUsuarioDTO({
      codigo: req.body.codigo,
      correo: req.body.correo,
      nombre: req.body.nombre,
      contrasena: req.body.contrasena,
      confirmacionContrasena: req.body.confirmacionContrasena,
    });

    // Verificar DTO
    validarDTO(dto);

    // Realizar otras verificaciones
    if (dto.contrasena !== dto.confirmacionContrasena) {
      throw generarErrorCapaPresentation({
        estado: 400,
        codigo: 'contrasena_diferente',
        mensajeServidor: `El campo [contrasena] debe ser igual a [confirmacionContrasena].`,
        mensajeCliente: `Las contraseñas deben ser iguales.`,
        resultado: null,
      });
    }

    // Construir datos
    req.personalizado.extra.dto = dto.toObject();

    next();
  } catch (error) {
    next(error);
  }
};
