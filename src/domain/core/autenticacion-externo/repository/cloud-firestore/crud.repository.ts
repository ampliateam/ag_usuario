import { IAutenticacionExterno } from "@global/models/ag_usuario";
import {
  ActualizarAutenticacionExternoDTO,
  CrearAutenticacionExternoDTO,
  BuscarAutenticacionExternoDTO,
} from "../../dto";
import {
  generarErrorCapaDomain,
  manejadorDeErrorFirebaseFirestore,
} from "@domain/_errors";
import { dateToTimestamp, genRanHex, timestampToDate } from "@domain/_helpers";
import { firebaseFirestore } from "@domain/_connections/firebase";
import { constants } from "@global/configs/constants";
import * as serviceParametroSistema from "@domain/core/parametro-sistema/service";

// Referenciar el manejador de error correspondiente
const manejadorDeError = manejadorDeErrorFirebaseFirestore;

export const crear = async (dto: CrearAutenticacionExternoDTO): Promise<IAutenticacionExterno> => {
  try {
    // Verificar datos requeridos [VERIFICACION-MODELO]
    if (!dto.nuevo.uid) {
      throw generarErrorCapaDomain({
        estado: 409,
        codigo: "datos_invalidos",
        mensajeServidor: `Se necesita [uid] para crear un usuario.`,
        mensajeCliente: `Se necesita [uid] para crear un usuario.`,
        resultado: null,
      });
    }

    // Verificar tipo de datos [VERIFICACION-MODELO]
    // ...

    // Verificar consistencia de datos [VERIFICACION-MODELO]
    // ...

    // Construir datos [VERIFICACION-MODELO]
    const [
        cantidadCaracterClavePrivada,
        cantidadCaracterClavePublica,
    ] = await Promise.all([
        serviceParametroSistema.crud.obtener({
            parametroBusqueda: constants.parametroBusqueda.cantidadCaracteresClavePrivada
        }),
        serviceParametroSistema.crud.obtener({
            parametroBusqueda: constants.parametroBusqueda.cantidadCaracteresClavePublica
        })
    ]);
    const clavePrivada = genRanHex(+cantidadCaracterClavePrivada.valor);
    const clavePublica = genRanHex(+cantidadCaracterClavePublica.valor);

    const nuevo: IAutenticacionExterno = {
      uid: dto.nuevo.uid,
      clavePrivada: clavePrivada,
      clavePublica: clavePublica,
      estado: dto.nuevo.estado || "deshabilitado",
      fechaCreacion: dto.nuevo.fechaCreacion || new Date(),
      fechaEliminacion: null,
    };

    const dataFirestore = Object.assign({}, nuevo, {
      fechaCreacion: dateToTimestamp(nuevo.fechaCreacion),
    });

    await firebaseFirestore
      .collection(constants.nombreStore.autenticacionExterno)
      .doc(dataFirestore.uid)
      .set(dataFirestore);

    return nuevo as IAutenticacionExterno;
  } catch (error) {
    return manejadorDeError(error);
  }
};

export const obtener = async (dto: BuscarAutenticacionExternoDTO): Promise<IAutenticacionExterno> => {
  try {
    // const autenticacionExterno: IAutenticacionExterno = {
    //   uid: "S4b6fxmV2tNef8Mmz1YX0fGQ7RB3",
    //   clavePrivada: "clave-privada-123",
    //   clavePublica: "clave-publica-123",
    //   estado: "habilitado",
    //   fechaCreacion: new Date(),
    //   fechaEliminacion: null,
    // };
    // return autenticacionExterno;

    let clave = '';

    // Obtener la clave de busqueda
    if (dto.uid) clave = 'uid';
    else if (dto.clavePublica) clave = 'clavePublica';
    else return null;

    const snapshot = await firebaseFirestore
      .collection(constants.nombreStore.autenticacionExterno)
      .where(clave, '==', dto[clave])
      .where('estado', '!=', 'eliminado')
      .get();

    if (snapshot.empty) return null;
    const document = snapshot.docs[0].data();
    if (document.estado === 'eliminado') return null;

    // Transformacion para la capa presentation
    if (document.fechaCreacion) {
      document.fechaCreacion = timestampToDate(document.fechaCreacion);
    }
    if (document.fechaEliminacion) {
      document.fechaEliminacion = timestampToDate(document.fechaEliminacion);
    }

    return document as IAutenticacionExterno;
  } catch (error) {
    return manejadorDeError(error);
  }
};

export const actualizar = async (dto: ActualizarAutenticacionExternoDTO): Promise<IAutenticacionExterno> => {
  try {
    const autenticacionExterno: IAutenticacionExterno = null;
    return autenticacionExterno;
  } catch (error) {
    return manejadorDeError(error);
  }
};
