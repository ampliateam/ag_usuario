import { constants } from '@global/configs/constants';
import { IParametroSistema } from '@domain/_models/interfaces'
import { firebaseFirestore } from "@domain/_connections/firebase"

export const obtenerParametroSistema = async (parametroBusqueda: string) => {
    const snapshot = await firebaseFirestore.collection(constants.coleccionParametroSistema).where('parametroBusqueda', '==', parametroBusqueda).get()
    if (snapshot.empty) return null;

    return snapshot.docs[0].data() as IParametroSistema;
}
