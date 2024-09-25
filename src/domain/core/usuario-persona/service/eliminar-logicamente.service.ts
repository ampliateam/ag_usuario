import { IUsuarioPersona } from '@global/models/interfaces';
import { EliminarUsuarioPersonaDTO } from '../dto';
import { cloudFirestore } from '../repository';

export const eliminarLogicamente = async (dto: EliminarUsuarioPersonaDTO): Promise<IUsuarioPersona> => {
    return await cloudFirestore.crud.actualizar({
        buscarPor: dto.buscarPor,
        actualizado: {
            estado: 'eliminado',
            fechaEliminacion: dto.fechaEliminacion
        }
    });
};
