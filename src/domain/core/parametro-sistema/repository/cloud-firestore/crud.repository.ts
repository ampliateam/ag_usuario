import { constants } from '@global/configs/constants';
import { IParametroSistema } from '@global/models/ag_usuario';
import { firebaseFirestore } from '@domain/_connections/firebase';
import { generateIdFirestore } from '@domain/_helpers';
import {
  ActualizarParametroSistemaDTO,
  CrearParametroSistemaDTO,
  BuscarParametroSistemaDTO,
} from '../../dto';
import { manejadorDeErrorFirebaseFirestore } from '@domain/_errors';

// Referenciar el manejador de error correspondiente
const manejadorDeError = manejadorDeErrorFirebaseFirestore;

export const crear = async (dto: CrearParametroSistemaDTO): Promise<IParametroSistema> => {
  try {
    const { nombreStore } = constants;
    const id = generateIdFirestore(nombreStore.parametroSistema);
    
    // // Verificar datos requeridos [VERIFICACION-MODELO]
    // ...

    // // Verificar tipo de datos [VERIFICACION-MODELO]
    // ...

    // // Verificar consistencia de datos [VERIFICACION-MODELO]
    // ...

    // Construir datos [VERIFICACION-MODELO]
    const nuevo: IParametroSistema = {
      id,
      parametroBusqueda: dto.nuevo.parametroBusqueda,
      valor: dto.nuevo.valor,
      observacion: dto.nuevo.observacion,
    };

    await firebaseFirestore
      .collection(constants.nombreStore.parametroSistema)
      .doc(nuevo.id)
      .set(nuevo);

    return nuevo as IParametroSistema;
  } catch (error) {
    return manejadorDeError(error);
  }
};

export const obtener = async (dto: BuscarParametroSistemaDTO): Promise<IParametroSistema> => {
  try {
    let clave = '';

    // Obtener la clave de busqueda
    if (dto.id) clave = 'id';
    else if (dto.parametroBusqueda) clave = 'parametroBusqueda';
    else return null;

    const snapshot = await firebaseFirestore
      .collection(constants.nombreStore.parametroSistema)
      .where(clave, '==', dto[clave])
      .get();

    if (snapshot.empty) return null;
    const documentData = snapshot.docs[0].data();

    return documentData as IParametroSistema;
  } catch (error) {
    return manejadorDeError(error);
  }
};

export const actualizar = async (dto: ActualizarParametroSistemaDTO): Promise<IParametroSistema> => {
  try {
    const { buscarPor, actualizado } = dto;

    // Buscar
    const obj = await obtener(buscarPor);
    if (!obj) return null;

    // Actualizar
    await firebaseFirestore
      .collection(constants.nombreStore.parametroSistema)
      .doc(obj.id)
      .update({
        ...obj,
        ...actualizado
      });

    // Retornar el modelo actualizado
    return {
      ...obj,
      ...actualizado
    };
  } catch (error) {
    return manejadorDeError(error);
  }
};
