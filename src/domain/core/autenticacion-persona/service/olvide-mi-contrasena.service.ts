import { services } from '@domain/services';
import { TEstadoSolicitudOmc } from "@domain/_models/types";
import { generarErrorCapaDomain } from "@domain/_helpers/errors";
import * as autenticacionPersonaRepository from "../repository";
import { CrearOmcSolicitudDTO } from "../dto";

export const crear = async (dto: CrearOmcSolicitudDTO) => {
  // Obtener el usuario con el correo seleccionado
  const usuario = await services.core.usuarioPersona.crud.obtener({
    correo: dto.correo
  });

  if (!usuario) {
    throw generarErrorCapaDomain({
      estado: 403,
      codigo: 'operacion_no_autorizada',
      mensaje: 'No se puede realizar la operación.',
      resultado: null
    });
  }

  dto.uidUsuario = usuario.uid;

  return await autenticacionPersonaRepository
  .firebaseAuthentication
  .olvideMiContrasena
  .crearSolicitudOmc(dto);
};

export const obtener = async (uid: string) => {
  return await autenticacionPersonaRepository
  .firebaseAuthentication
  .olvideMiContrasena
  .obtenerSolicitudOmc(uid);
};

export const actualizar = async (
  uid: string,
  estado: TEstadoSolicitudOmc
) => {
  return await autenticacionPersonaRepository
  .firebaseAuthentication
  .olvideMiContrasena
  .actualizarSolicitudOmc(uid, estado);
};
