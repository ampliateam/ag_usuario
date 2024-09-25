import { envs } from './envs';

const constantes = {
    codigoServicioPrincipal: 'ag_usuario',
    nombreStore: {
        usuarioPersona: 'UsuariosPersona',
        olvideMiContrasena: 'SolicitudesOlvideMiContrasena',
        parametroSistema: 'ParametrosSistema',
    },
    parametroBusqueda: {
        baseUrlAgUsuario: 'base_url_ag_usuario',
        tiempoExpiracionTokenCambioContrasena: 'tiempo_expiracion_token_cambio_contrasena',
    }
};

if (envs.modoTest) {
    // No agregar el de `ParametrosSistema`
    constantes.nombreStore.usuarioPersona += '_test';
    constantes.nombreStore.olvideMiContrasena += '_test';
}

export const constants = constantes;
