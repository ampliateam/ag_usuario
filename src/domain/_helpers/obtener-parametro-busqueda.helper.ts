import { constants } from '@global/configs/constants';
import { IParametroSistema } from '@domain/_models/interfaces'
import { firebaseFirestore } from '@domain/_connections/firebase'

export const obtenerParametroSistema = async (parametroBusqueda: string) => {
    console.log('constants.nombreStore.parametroSistema', constants.nombreStore.parametroSistema)
    console.log('parametroBusqueda', parametroBusqueda)
    const snapshot = await firebaseFirestore.collection(constants.nombreStore.parametroSistema).where('parametroBusqueda', '==', parametroBusqueda).get()
    console.log('snapshot.empty', snapshot.empty)
    if (snapshot.empty) return null;

    console.log('snapshot.docs[0].data()', snapshot.docs[0].data());

    return snapshot.docs[0].data() as IParametroSistema;
};
