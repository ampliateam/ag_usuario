import { IAutenticacionExterno } from '@global/models/ag_usuario';
import { EliminarLogicamenteDTO } from '../dto';
import * as repository from '../repository/cloud-firestore';

export const eliminarLogicamente = async (dto: EliminarLogicamenteDTO): Promise<IAutenticacionExterno> => {
    return await repository.crud.actualizar({
        buscarPor: dto.buscarPor,
        actualizado: {
            estado: 'eliminado',
            fechaEliminacion: dto.fechaEliminacion,
        }
    });
};
