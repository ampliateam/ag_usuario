import { Application } from "express";
import {
  personaRoute,
  personaPropioRoute,
} from "@presentation/entidad/persona/routes";
// import {  } from '@presentation/modulo-externo/routes';
// import {
//   moderadorPersonaRoute,
//   moderadorExternoRoute,
// } from "@presentation/moderacion/routes";
import { validacionRoute } from "@presentation/operacion/validacion/routes";

export const inicializarEndpoints = (app: Application) => {
  // // Endpoints del modulo externo
  // app.use('/v1/modulo-externo', externoRoute);
  // app.use('/v1/modulo-externo/propio', externoPropioRoute);

  // Endpoints del modulo persona
  app.use("/v1/entidad/persona", personaRoute);
  app.use("/v1/entidad/persona/propio", personaPropioRoute);

  // // Endpoints de moderacion
  // app.use("/v1/moderacion/externo", moderadorExternoRoute);
  // app.use("/v1/moderacion/persona", moderadorPersonaRoute);

  // Endpoints de operacion de validacion
  app.use("/v1/validacion", validacionRoute);
};
