import { constants } from '@global/configs/constants';
import { IUsuario } from '@global/models/ag_usuario';
import { firebaseFirestore } from '@domain/_connections/firebase';
import { dateToTimestamp, timestampToDate } from '@domain/_helpers';
import {
  ActualizarUsuarioDTO,
  CrearUsuarioDTO,
  BuscarUsuarioDTO,
} from '../../dto';
import { generarErrorCapaDomain, manejadorDeErrorFirebaseFirestore } from '@domain/_errors';

// Referenciar el manejador de error correspondiente
const manejadorDeError = manejadorDeErrorFirebaseFirestore;

export const crear = async (dto: CrearUsuarioDTO): Promise<IUsuario> => {
  try {
    // Verificar datos requeridos [VERIFICACION-MODELO]
    if (!dto.usuario.uid || !dto.usuario.correo || !dto.usuario.codigo || !dto.usuario.nombre) {
      throw generarErrorCapaDomain({
        estado: 409,
        codigo: 'datos_invalidos',
        mensajeServidor: `Se necesita [uid], [correo], [codigo] y [nombre] para crear un usuario.`,
        mensajeCliente: `Se necesita [uid], [correo], [codigo] y [nombre] para crear un usuario.`,
        resultado: null
      });
    }

    // Verificar tipo de datos [VERIFICACION-MODELO]
    // ...

    // Verificar consistencia de datos [VERIFICACION-MODELO]
    // ...

    // Construir datos [VERIFICACION-MODELO]
    const nuevo: IUsuario = {
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
      .collection(constants.nombreStore.usuario)
      .doc(dataFirestore.uid)
      .set(dataFirestore);

    return nuevo as IUsuario;
  } catch (error) {
    return manejadorDeError(error);
  }
};

export const obtener = async (dto: BuscarUsuarioDTO): Promise<IUsuario> => {
  try {
    let clave = '';

    // Obtener la clave de busqueda
    if (dto.uid) clave = 'uid';
    else if (dto.correo) clave = 'correo';
    else if (dto.codigo) clave = 'codigo';
    else return null;

    const snapshot = await firebaseFirestore
      .collection(constants.nombreStore.usuario)
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

    return document as IUsuario;
  } catch (error) {
    return manejadorDeError(error);
  }
};

export const actualizar = async (dto: ActualizarUsuarioDTO): Promise<IUsuario> => {
  try {
    const { buscarPor, actualizado } = dto;

    // Buscar
    const objeto = await obtener(buscarPor);
    if (!objeto) return null;
    
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
      .collection(constants.nombreStore.usuario)
      .doc(objeto.uid)
      .update({
        ...objeto,
        ...actualizadoFirestore
      });

    // Retornar el modelo actualizado
    return {
      ...objeto,
      ...actualizado
    };
  } catch (error) {
    return manejadorDeError(error);
  }
};
