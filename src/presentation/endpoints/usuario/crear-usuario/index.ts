import { verificarCreacionUsuario } from "./middleware";
import { crearUsuario } from "./controller";

export const list = [
  verificarCreacionUsuario,
  crearUsuario
];