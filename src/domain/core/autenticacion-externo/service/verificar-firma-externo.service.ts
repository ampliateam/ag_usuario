import { IAutenticacionExterno } from "@global/models/ag_usuario";
import { VerificarFirmaDTO } from "../dto";
import * as repository from "../repository/cloud-firestore";

export const verificarFirmaExterno = async (dto: VerificarFirmaDTO): Promise<IAutenticacionExterno> => {
  return await repository.verificarFirmaExterno(dto);
};
