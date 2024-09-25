import { constants } from '@global/configs/constants';
import { IUsuarioPersona } from '@global/models/interfaces';
import { firebaseFirestore } from '@domain/_connections/firebase';
import { dateToTimestamp, timestampToDate } from '@domain/_helpers';
import {
  ActualizarUsuarioPersonaDTO,
  CrearUsuarioPersonaDTO,
  BuscarUsuarioPersonaDTO,
} from '../../dto';
import { generarErrorCapaDomain } from '@domain/_helpers/errors';

export const crear = async (dto: CrearUsuarioPersonaDTO): Promise<IUsuarioPersona> => {
  // Verificar datos requeridos [VERIFICACION-MODELO]
  if (!dto.usuario.uid || !dto.usuario.correo || !dto.usuario.codigo || !dto.usuario.nombre) {
    throw generarErrorCapaDomain({
      estado: 409,
      codigo: 'datos_invalidos',
      mensaje: `Se necesita [uid], [correo], [codigo] y [nombre] para crear un usuario.`,
      resultado: null
    });
  }

  // Verificar tipo de datos [VERIFICACION-MODELO]
  // ...

  // Verificar consistencia de datos [VERIFICACION-MODELO]
  // ...

  // Construir datos [VERIFICACION-MODELO]
  const nuevo: IUsuarioPersona = {
    uid: dto.usuario.uid,
    correo: dto.usuario.correo,
    codigo: dto.usuario.codigo,
    correoVerificado: dto.usuario.correoVerificado ?? false,
    nombre: dto.usuario.nombre,
    telefono: dto.usuario.telefono || '',
    fotoPerfil: dto.usuario.fotoPerfil || '',
    rol: dto.usuario.rol && dto.usuario.rol.length ? dto.usuario.rol : ['miembro'],
    estado: dto.usuario.estado || 'habilitado',
    fechaCreacion: dto.usuario.fechaCreacion || new Date(),
    fechaEliminacion: null,
  };
  
  const dataFirestore = Object.assign({}, nuevo, {
    fechaCreacion: dateToTimestamp(nuevo.fechaCreacion),
  });

  await firebaseFirestore
    .collection(constants.nombreStore.usuarioPersona)
    .doc(dataFirestore.uid)
    .set(dataFirestore);

  return nuevo as IUsuarioPersona;
};

export const obtener = async (dto: BuscarUsuarioPersonaDTO): Promise<IUsuarioPersona> => {
  let clave = '';

  // Obtener la clave de busqueda
  if (dto.uid) clave = 'uid';
  else if (dto.correo) clave = 'correo';
  else if (dto.codigo) clave = 'codigo';
  else return null;

  const snapshot = await firebaseFirestore
    .collection(constants.nombreStore.usuarioPersona)
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

  return document as IUsuarioPersona;
};

export const actualizar = async (dto: ActualizarUsuarioPersonaDTO): Promise<IUsuarioPersona> => {
  const { buscarPor, actualizado } = dto;

  // Buscar
  const usuarioPersona = await obtener(buscarPor);
  if (!usuarioPersona) return null;
  
  // Transformacion para Firestore
  const actualizadoFirestore = { ...actualizado } as any;
  if (actualizado.fechaCreacion) {
    actualizadoFirestore.fechaCreacion = dateToTimestamp(actualizado.fechaCreacion);
  }
  if (actualizado.fechaEliminacion) {
    actualizadoFirestore.fechaEliminacion = dateToTimestamp(actualizado.fechaEliminacion);
  }

  // Actualizar
  await firebaseFirestore
    .collection(constants.nombreStore.usuarioPersona)
    .doc(usuarioPersona.uid)
    .update({
      ...usuarioPersona,
      ...actualizadoFirestore
    });

  // Retornar el modelo actualizado
  return {
    ...usuarioPersona,
    ...actualizado
  };
};
