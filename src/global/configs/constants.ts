import { envs } from "./envs";

const constantes = {
    codigoServicioPrincipal: 'ag_usuario',
    coleccionUsuarioPersona: 'UsuariosPersona',
    coleccionParametroSistema: 'ParametrosSistema',
    coleccionSolicitudOlvideMiContrasena: 'SolicitudesOlvideMiContrasena',
    parametroBusqueda: {
        baseUrlAgUsuario: 'base_url_ag_usuario',
        tiempoExpiracionTokenCambioContrasena: 'tiempo_expiracion_token_cambio_contrasena',
    }
};

if (envs.modoTest) {
    constantes.coleccionParametroSistema += '_test';
    constantes.coleccionUsuarioPersona += '_test';
    constantes.coleccionSolicitudOlvideMiContrasena += '_test';
}

export const constants = constantes;