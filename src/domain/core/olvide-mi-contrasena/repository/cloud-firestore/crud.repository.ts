import jwt from 'jsonwebtoken';
import { envs } from '@global/configs/envs';
import { constants } from '@global/configs/constants';
import { services } from '@domain/services';
import { firebaseFirestore } from '@domain/_connections/firebase';
import {
  ActualizarOlvideMiContrasenaDTO,
  BuscarOlvideMiContrasenaDTO,
  CrearOlvideMiContrasenaDTO
} from '../../dto';
import { generateIdFirestore } from '@domain/_helpers';
import {
  dateToTimestamp,
  timestampToDate,
} from '@domain/_helpers';
import { IOlvideMiContrasena } from '@global/models/ag_usuario';
import { generarErrorCapaDomain, manejadorDeErrorFirebaseFirestore } from '@domain/_errors';

// Referenciar el manejador de error correspondiente
const manejadorDeError = manejadorDeErrorFirebaseFirestore;

export const crear = async (dto: CrearOlvideMiContrasenaDTO): Promise<IOlvideMiContrasena> => {
  try {
    const { parametroBusqueda, nombreStore } = constants;

    // Verificar datos requeridos [VERIFICACION-MODELO]
    if (!dto.olvideMiContrasena.uidUsuario) {
      throw generarErrorCapaDomain({
        estado: 409,
        codigo: 'datos_invalidos',
        mensajeServidor: `Se necesita [correo], [codigo] y [nombre] para crear un usuario.`,
        mensajeCliente: `Se necesita [correo], [codigo] y [nombre] para crear un usuario.`,
        resultado: null
      });
    }

    // Verificar tipo de datos [VERIFICACION-MODELO]
    // ...

    // Verificar consistencia de datos [VERIFICACION-MODELO]
    // ...
    
    // Construir datos [VERIFICACION-MODELO]
    const id = generateIdFirestore(nombreStore.olvideMiContrasena);
    const fechaCreacion = dto.olvideMiContrasena.fechaCreacion || new Date();
    let token = dto.olvideMiContrasena.token || '';
    
    if (!dto.olvideMiContrasena.token) {
      // Obtiene el tiempo de expiracion del token para cambio de contrasena
      const parametroSistema = await services.core.parametroSistema.crud.obtener({
        parametroBusqueda: parametroBusqueda.tiempoExpiracionTokenCambioContrasena
      });
      
      // Creacion del token para realizar la operacion
      token = jwt.sign(
        {
          uidUsuario: dto.olvideMiContrasena.uidUsuario,
          idOlvideMiContrasena: id,
          fechaCreacion: fechaCreacion.toISOString(),
        },
        envs.secretKeyTokenCambioContrasena,
        { expiresIn: parametroSistema.valor }
      );
    }

    // Model
    const data: IOlvideMiContrasena = {
      id,
      uidUsuario: dto.olvideMiContrasena.uidUsuario,
      token,
      estado: dto.olvideMiContrasena.estado || 'pendiente',
      fechaCreacion,
    };

    // Model Firestore
    const dataFirestore: any = {
      ...data,
      fechaCreacion: dateToTimestamp(data.fechaCreacion)
    };

    // Guardar datos en firestore
    await firebaseFirestore
      .collection(nombreStore.olvideMiContrasena)
      .doc(id)
      .set(dataFirestore);

    return data;
  } catch (error) {
    return manejadorDeError(error);
  }
};

export const obtener = async (dto: BuscarOlvideMiContrasenaDTO): Promise<IOlvideMiContrasena> => {
  try {
    const { nombreStore } = constants;

    const doc = await firebaseFirestore
      .collection(nombreStore.olvideMiContrasena)
      .doc(dto.id)
      .get();
    if (!doc) return null;

    return {
      id: doc.data().id,
      uidUsuario: doc.data().uidUsuario,
      token: doc.data().token,
      estado: doc.data().estado,
      fechaCreacion: timestampToDate(doc.data().fechaCreacion),
    };
  } catch (error) {
    return manejadorDeError(error);
  }
};

export const actualizar = async (dto: ActualizarOlvideMiContrasenaDTO): Promise<IOlvideMiContrasena> => {
  try {
    const { buscarPor, actualizado } = dto;
    const { nombreStore } = constants;

    // Objeto a actualizar
    let obj = await obtener(buscarPor);
    if (!obj) return null;

    // Transformacion para Firestore
    const actualizadoFirestore = {...actualizado};
    if (actualizadoFirestore.fechaCreacion) {
      actualizadoFirestore.fechaCreacion = dateToTimestamp(actualizadoFirestore.fechaCreacion) as any;
    }

    await firebaseFirestore
      .collection(nombreStore.olvideMiContrasena)
      .doc(buscarPor.id)
      .update(actualizadoFirestore);

    return {
      ...obj,
      ...actualizado
    };
  } catch (error) {
    return manejadorDeError(error);
  }
};
