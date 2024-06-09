import jwt from "jsonwebtoken";
import { envs } from "@global/configs/envs";
import { constants } from "@global/configs/constants";
import { firebaseFirestore } from "@domain/_connections/firebase";
import { CrearOmcSolicitudDTO } from "../../dto";
import { obtenerParametroSistema } from "@domain/_helpers";
import {
  TEstadoSolicitudOmc,
  listaEstadoSolicitudOmc,
} from "@domain/_models/types";
import {
  dateToTimestamp,
  timestampToDate,
} from "@domain/_helpers";

export const crearSolicitudOmc = async (dto: CrearOmcSolicitudDTO) => {
  const {
    parametroBusqueda,
    coleccionSolicitudOlvideMiContrasena
  } = constants;
  
  const id = firebaseFirestore
    .collection(coleccionSolicitudOlvideMiContrasena)
    .doc().id;

  // Obtiene el tiempo de expiracion del token para cambio de contrasena
  const parametroSistema = await obtenerParametroSistema(
    parametroBusqueda.tiempoExpiracionTokenCambioContrasena
  );

  const token = jwt.sign(
    {
      uidUsuario: dto.uidUsuario,
      uidSolicitudOmc: id,
      fechaCreacion: dto.fechaCreacion.toUTCString(),
    },
    envs.secretKeyTokenCambioContrasena,
    { expiresIn: parametroSistema.valor }
  );

  const data = {
    uid: id,
    uidUsuario: dto.uidUsuario,
    token: token,
    estado: "pendiente",
    fechaCreacion: dateToTimestamp(dto.fechaCreacion),
  };

  await firebaseFirestore
    .collection(coleccionSolicitudOlvideMiContrasena)
    .doc(id)
    .set(data);

  return {
    uid: data.uid,
    uidUsuario: data.uidUsuario,
    token: data.token,
    estado: data.estado,
    fechaCreacion: timestampToDate(data.fechaCreacion),
  };
};

export const obtenerSolicitudOmc = async (uid: string) => {
  const { coleccionSolicitudOlvideMiContrasena } = constants;

  const doc = await firebaseFirestore
    .collection(coleccionSolicitudOlvideMiContrasena)
    .doc(uid)
    .get();
  if (!doc) return null;

  return {
    uid: doc.data().uid,
    uidUsuario: doc.data().uidUsuario,
    token: doc.data().token,
    estado: doc.data().estado,
    fechaCreacion: timestampToDate(doc.data().fechaCreacion),
  };
};

export const actualizarSolicitudOmc = async (
  uid: string,
  estado: TEstadoSolicitudOmc
) => {
  const { coleccionSolicitudOlvideMiContrasena } = constants;

  if (!listaEstadoSolicitudOmc.includes(estado)) {
    throw new Error("El campo [estado] es inválido.");
  }

  await firebaseFirestore
    .collection(coleccionSolicitudOlvideMiContrasena)
    .doc(uid)
    .update({ estado });
};
