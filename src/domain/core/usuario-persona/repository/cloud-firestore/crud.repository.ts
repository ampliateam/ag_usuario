import { constants } from "@global/configs/constants";
import { IUsuarioPersona } from "@global/models/interfaces";
import { firebaseFirestore } from "@domain/_connections/firebase";
import { dateToTimestamp, timestampToDate } from "@domain/_helpers";
import {
  ActualizarUsuarioPersonaDTO,
  CrearUsuarioPersonaDTO,
  BuscarUsuarioPersonaDTO,
} from "../../dto";

export const crear = async (
  dto: CrearUsuarioPersonaDTO
): Promise<IUsuarioPersona> => {
  const usuarioPersona: IUsuarioPersona = dto.usuario;

  // Transformacion para Firestore
  const usuarioPersonaNuevo = Object.assign({}, usuarioPersona, {
    fechaCreacion: dateToTimestamp(dto.usuario.fechaCreacion),
  });

  await firebaseFirestore
    .collection(constants.coleccionUsuarioPersona)
    .doc(usuarioPersonaNuevo.uid)
    .set(usuarioPersonaNuevo);

  return usuarioPersona;
};

export const obtener = async (
  dto: BuscarUsuarioPersonaDTO
): Promise<IUsuarioPersona> => {
  let clave = "";

  // Obtener la clave de busqueda
  if (dto.uid) clave = "uid";
  else if (dto.correo) clave = "correo";
  else if (dto.codigo) clave = "codigo";
  else return null;

  const snapshot = await firebaseFirestore
    .collection(constants.coleccionUsuarioPersona)
    .where(clave, "==", dto[clave])
    .where("estado", "!=", "eliminado")
    .get();

  if (snapshot.empty) return null;
  const document = snapshot.docs[0].data();
  if (document.estado === "eliminado") return null;

  // Transformacion para la capa presentation
  document.fechaCreacion
    ? (document.fechaCreacion = timestampToDate(document.fechaCreacion))
    : "";
  document.fechaEliminacion
    ? (document.fechaEliminacion = timestampToDate(document.fechaEliminacion))
    : "";

  return document as IUsuarioPersona;
};

export const actualizar = async (
  dto: ActualizarUsuarioPersonaDTO
): Promise<IUsuarioPersona> => {
  let usuarioPersona: IUsuarioPersona = await obtener(dto.buscarPor);
  if (!usuarioPersona) return null;

  // Transformacion para Firestore
  const fechasAuxiliares: any = {};
  dto.actualizado.fechaCreacion
    ? (fechasAuxiliares.fechaCreacion = dateToTimestamp(
        dto.actualizado.fechaCreacion
      ))
    : "";
  dto.actualizado.fechaEliminacion
    ? (fechasAuxiliares.fechaEliminacion = dateToTimestamp(
        dto.actualizado.fechaEliminacion
      ))
    : "";
  const usuarioPersonaActualizado = Object.assign(
    {},
    dto.actualizado,
    fechasAuxiliares
  );

  await firebaseFirestore
    .collection(constants.coleccionUsuarioPersona)
    .doc(usuarioPersona.uid)
    .update(usuarioPersonaActualizado);

  // Transformacion para la capa presentation
  Object.assign(usuarioPersona, dto.actualizado);

  return usuarioPersona;
};
