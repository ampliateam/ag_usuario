import { generarErrorCapaPresentation } from '../_errors';
import { services } from '@domain/services';
import { ICredencialUsuario } from '@global/models/_system';

export const verificarPresentationSolicitante = async (cu: ICredencialUsuario) => {
  const respuesta = {
    usuario: null,
    autenticacionPersona: null,
    autenticacionExterno: null,
  };

  // Verificacion para caso de cliente desconocido
  if (cu.tipo === 'persona') {
    const { token } = cu.persona;

    // Verificaciones para caso de cliente persona/externo
    if (!token) {
      throw generarErrorCapaPresentation({
        estado: 401,
        codigo: 'no_autorizado',
        mensajeServidor: `Se requiere un token para realizar la operación.`,
        mensajeCliente: `Se requiere un token para realizar la operación.`,
        resultado: null,
      });
    }

    const tokenDecodificadoPersona = await services.core.autenticacionPersona.verificarToken(token);
    const autenticacionPersona = await services.core.autenticacionPersona.crud.obtener({
      uid: tokenDecodificadoPersona.uid
    });
    const usuario = await services.core.usuario.crud.obtener({
      uid: tokenDecodificadoPersona.uid
    });

    respuesta.autenticacionPersona = autenticacionPersona;
    respuesta.usuario = usuario;
  } else if (cu.tipo === 'externo') {
    const { publicKey, timestamp, signature } = cu.externo;

    // Verificaciones para caso de cliente persona/externo
    if (!publicKey || !timestamp || !signature) {
      throw generarErrorCapaPresentation({
        estado: 401,
        codigo: 'no_autorizado',
        mensajeServidor: `Se requiere publicKey, timestamp y signature para realizar la operación.`,
        mensajeCliente: `Se requieren las credenciales de externo para realizar la operación.`,
        resultado: null,
      });
    }

    // Verificar firma del `usuario-externo`
    const autenticacionExterno = await services.core.autenticacionExterno.verificarFirmaExterno({
      publicKey,
      timestamp,
      signature
    });
    if (!autenticacionExterno) {
      throw generarErrorCapaPresentation({
        estado: 401,
        codigo: 'no_autorizado',
        mensajeServidor: `Clave pública no reconocida.`,
        mensajeCliente: `Clave pública no reconocida.`,
        resultado: null,
      });
    }

    const usuario = await services.core.usuario.crud.obtener({
      uid: autenticacionExterno.uid
    });

    respuesta.autenticacionExterno = autenticacionExterno;
    respuesta.usuario = usuario;
  }

  return respuesta;
};
