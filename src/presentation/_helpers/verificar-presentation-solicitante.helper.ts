import { TPresentationSolicitanteTipo } from '@presentation/_models/types';
import { generarErrorCapaPresentation } from '../_errors';
import { services } from '@domain/services';

export const verificarPresentationSolicitante = async (psTipo: TPresentationSolicitanteTipo, idToken: string) => {
  const respuesta = {
    usuario: null,
    autenticacionPersona: null,
    tokenDecodificadoPersona: null,
    autenticacionExterno: null,
    tokenDecodificadoExterno: null,
  };

  // Verificacion para caso de cliente desconocido
  if (psTipo === 'desconocido') return respuesta;

  // Verificaciones para caso de cliente persona/externo
  if (!idToken) {
    throw generarErrorCapaPresentation({
      estado: 401,
      codigo: 'no_autorizado',
      mensajeServidor: `Se requiere un token para realizar la operación.`,
      mensajeCliente: `Se requiere un token para realizar la operación.`,
      resultado: null,
    });
  }

  // Verificar token de usuario
  try {
    if (psTipo === 'persona') {
      const tokenDecodificado = await services.core.autenticacionPersona.verificarToken(idToken);
      respuesta.tokenDecodificadoPersona = tokenDecodificado;

      respuesta.usuario = await services.core.usuario.crud.obtener({
        uid: tokenDecodificado.uid
      });

      respuesta.autenticacionPersona = await services.core.autenticacionPersona.crud.obtener({
        uid: tokenDecodificado.uid
      });
    } else {
      // TODO: Implementar verificacion del `PS-externo`
    }
  } catch (error) {
    throw generarErrorCapaPresentation({
      ref: error.ref,
      estado: error.estado,
      codigo: error.codigo,
      mensajeServidor: error.mensajeServidor,
      mensajeCliente: error.mensajeCliente,
      resultado: error.resultado,
    });
  }

  return respuesta;
};
