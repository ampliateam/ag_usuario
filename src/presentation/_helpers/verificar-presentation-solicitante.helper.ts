import { TPresentationSolicitanteTipo } from '@presentation/_models/types';
import { generarErrorCapaPresentation } from '../_errors';
import { services } from '@domain/services';

export const verificarPresentationSolicitante = async (psTipo: TPresentationSolicitanteTipo, dataAuth: any) => {
  const respuesta = {
    usuario: null,
    autenticacionPersona: null,
    autenticacionExterno: null,
  };

  // Verificacion para caso de cliente desconocido
  if (psTipo === 'persona') {
    const { token } = dataAuth;
    
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
  } else if (psTipo === 'externo') {
    const { publicKey, timestamp, signature } = dataAuth;

    if (timestamp >= Date.now()) {
      throw generarErrorCapaPresentation({
        estado: 401,
        codigo: 'no_autorizado',
        mensajeServidor: 'El valor del `timestamp` tiene que ser menor al momento de la solicitud.',
        mensajeCliente: `No autorizado.`,
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
