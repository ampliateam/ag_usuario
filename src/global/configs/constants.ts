import { envs } from './envs';

const constantes = {
  codigoServicioPrincipal: 'ag_usuario',
  nombreStore: {
    usuario: 'Usuarios',
    autenticacionExterno: 'AutenticacionExterno',
    olvideMiContrasena: 'SolicitudesOlvideMiContrasena',
    parametroSistema: 'ParametrosSistema',
  },
  parametroBusqueda: {
    tiempoExpiracionTokenCambioContrasena: 'tiempo_expiracion_token_cambio_contrasena',
    cantidadCaracteresClavePrivada: 'cantidad_caracteres_clave_privada',
    cantidadCaracteresClavePublica: 'cantidad_caracteres_clave_publica',
  },
};

if (envs.modoTest) {
  // No agregar el de `ParametrosSistema`
  constantes.nombreStore.usuario += '_test';
  constantes.nombreStore.autenticacionExterno += '_test';
  constantes.nombreStore.olvideMiContrasena += '_test';
}

export const constants = constantes;
