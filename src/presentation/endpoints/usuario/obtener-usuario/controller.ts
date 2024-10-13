import { NextFunction, Request, Response } from "express";
import { services } from "@domain/services";
import { generarRespuestaServidor } from "@presentation/_helpers";
import { generarErrorCapaPresentation } from "@presentation/_errors";

export const obtenerUsuario = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      uid,
      correo,
      codigo,
      obtenerAuthPersona,
      obtenerAuthExterno
    } = req.query;

    const { presentationSolicitante } = req.personalizado;
    const uidSolicitante = presentationSolicitante.usuario?.uid || '';

    const filtro = {};
    if (uid) filtro['uid'] = uid;
    else if (correo) filtro['correo'] = correo;
    else if (codigo) filtro['codigo'] = codigo;
    else {
      throw generarErrorCapaPresentation({
        estado: 400, 
        codigo: 'faltan_datos', 
        mensajeServidor: 'No hay datos de [uid], [correo] o [codigo] para realizar la busqueda.', 
        mensajeCliente: 'No hay datos para realizar la busqueda.', 
        resultado: null
      });
    };
    const usuario = await services.core.usuario.crud.obtener(filtro);
    const resultado:any = {
      usuario,
      autenticacionPersona: null,
      autenticacionExterno: null,
    };

    if (!usuario) {
      const respuestaServidor = generarRespuestaServidor({
        exito: true,
        mensaje: 'No existe el usuario.',
        resultado,
      });

      return res.json(respuestaServidor);
    }

    resultado.autenticacionPersona = uidSolicitante === usuario.uid && !!obtenerAuthPersona
    ? await services.core.autenticacionPersona.crud.obtener({
      uid: usuario.uid
    })
    : null;

    resultado.autenticacionExterno = uidSolicitante === usuario.uid && !!obtenerAuthExterno
    ? await services.core.autenticacionExterno.crud.obtener({
      uid: usuario.uid
    })
    : null;

    const respuestaServidor = generarRespuestaServidor({
      exito: true,
      mensaje: 'Se obtuvo el usuario de forma correcta.',
      resultado,
    });

    return res.json(respuestaServidor);
  } catch (error) {
    return next(error);
  }
}
