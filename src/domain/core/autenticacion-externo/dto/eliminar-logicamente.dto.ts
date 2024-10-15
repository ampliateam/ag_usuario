import { BuscarAutenticacionExternoDTO } from "./crud.dto";

export interface EliminarLogicamenteDTO {
  buscarPor: BuscarAutenticacionExternoDTO;
  fechaEliminacion: Date;
}
