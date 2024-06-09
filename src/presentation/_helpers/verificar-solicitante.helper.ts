import { generarErrorCapaPresentacion } from "./errors";
import { TSolicitanteTipo } from "@global/models/types";
import { services } from "@domain/services";

export const verificarSolicitante = async (
  solicitanteTipo: TSolicitanteTipo,
  idToken: string
) => {
  const respuesta = {
    tokenDecodificado: null,
    usuario: null,
    autenticacion: null,
  };

  // Verificacion para caso de cliente desconocido
  if (solicitanteTipo === "desconocido") {
    if (idToken) {
      throw generarErrorCapaPresentacion({
        estado: 401,
        codigo: "no_autorizado",
        mensaje: `El cliente tipo [desconocido] no puede contar con un token.`,
        resultado: null,
      });
    }

    return respuesta;
  }

  // Verificaciones para caso de cliente persona/externo
  if (!idToken) {
    throw generarErrorCapaPresentacion({
      estado: 401,
      codigo: "no_autorizado",
      mensaje: `El cliente requiere un token.`,
      resultado: null,
    });
  }

  try {
    if (solicitanteTipo === "persona") {
      respuesta.tokenDecodificado =
        await services.core.autenticacionPersona.verificarToken(idToken);
    } else {
    //   respuesta.tokenDecodificado =
    //     await services.core.autenticacionExterno.verificarToken(idToken);
    }
  } catch (error) {
    throw generarErrorCapaPresentacion({
      estado: error.estado,
      codigo: error.codigo,
      mensaje: error.mensaje,
      resultado: error.resultado,
    });
  }

  // Obtener Usuario y su Autenticacion correspondiente
  if (solicitanteTipo === "persona") {
    respuesta.autenticacion =
      await services.core.autenticacionPersona.crud.obtener({
        uid: respuesta.tokenDecodificado.uid,
      });
    respuesta.usuario = await services.core.usuarioPersona.crud.obtener({
      uid: respuesta.tokenDecodificado.uid,
    });
  } else {
    // respuesta.autenticacion = await autenticacionPersonaUseCase.crud.obtener({ uid: respuesta.tokenDecodificado.uid });
    // respuesta.usuario = await usuarioPersonaUseCase.crud.obtener({ uid: respuesta.tokenDecodificado.uid });
    respuesta.autenticacion = null;
    respuesta.usuario = null;
  }

  if (!respuesta.autenticacion || !respuesta.usuario) {
    throw generarErrorCapaPresentacion({
      estado: 404,
      codigo: "usuario_no_encontrado",
      mensaje: "No existe tu usuario",
      resultado: null,
    });
  }

  return respuesta;
};
