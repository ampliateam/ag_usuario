import { BuscarUsuarioDTO } from "./crud.dto";

export interface EliminarLogicamenteDTO {
  buscarPor: BuscarUsuarioDTO;
  fechaEliminacion: Date;
}
