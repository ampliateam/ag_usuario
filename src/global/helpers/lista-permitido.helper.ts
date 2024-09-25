import {
  EnvironmentPermitido,
  TSolicitanteTipo,
  TUsuarioEstado,
  TUsuarioExternoRol,
  TUsuarioPersonaRol,
  TUsuarioTipo,
  TOlvideMiContrasenaEstado,
} from '@global/models/types';

// Environment
export const listaEnvironmentPermitido: EnvironmentPermitido[] = ['personal', 'development', 'testing', 'production'];

// Solicitante
export const listaSolicitanteTipo: TSolicitanteTipo[] = ['desconocido', 'persona', 'externo'];

// Usuario
export const listaUsuarioEstado: TUsuarioEstado[] = ['habilitado', 'deshabilitado', 'eliminado'];
export const listaUsuarioPersonaRol: TUsuarioPersonaRol[] = ['moderador', 'miembro'];
export const listaUsuarioExternoRol: TUsuarioExternoRol[] = ['miembro', 'servicio'];
export const listaUsuarioTipo: TUsuarioTipo[] = ['persona', 'externo'];

// OlvideMiContrasena
export const listaOlvideMiContrasenaEstado: TOlvideMiContrasenaEstado[] = ['pendiente', 'aprobado', 'rechazado'];
