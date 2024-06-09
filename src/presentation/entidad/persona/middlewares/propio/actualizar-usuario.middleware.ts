import { NextFunction, Request, Response } from 'express';
import { IUsuarioPersona } from '@global/models/interfaces';
import { services } from '@domain/services';
import { validarDTO } from '@presentation/_helpers';
import { ActualizarUsuarioDTO } from '@presentation/entidad/persona/models/dto';
import { generarErrorCapaPresentacion } from '@presentation/_helpers/errors';

export const verificarActualizacionUsuario = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { usuario: usuarioPersonaSolicitante } = req.personalizado.solicitante.persona;
        const actualizarUsuarioDTO = req.body as ActualizarUsuarioDTO;
        const { correo, codigo, nombre, contrasena, confirmacionContrasena } = actualizarUsuarioDTO;
        
        await validarDTO(actualizarUsuarioDTO);

        // Verificar existencia de correo
        const queries = [];
        queries.push(correo ? services.core.usuarioPersona.crud.obtener({ correo }) : null);
        queries.push(codigo ? services.core.usuarioPersona.crud.obtener({ codigo }) : null);
        const resultadoDeQueries: IUsuarioPersona[] = await Promise.all(queries);
        const [ usuarioPorCorreo, usuarioPorCodigo ] = resultadoDeQueries;
        
        if (correo && usuarioPorCorreo && usuarioPorCorreo.uid !== usuarioPersonaSolicitante.uid) {
            throw generarErrorCapaPresentacion({
                estado: 403, 
                codigo: 'correo_en_uso', 
                mensaje: 'Ya se está usando este correo.', 
                resultado: null
            });
        }

        if (codigo && usuarioPorCodigo && usuarioPorCodigo.uid !== usuarioPersonaSolicitante.uid) {
            throw generarErrorCapaPresentacion({
                estado: 403, 
                codigo: 'codigo_en_uso', 
                mensaje: 'Ya se está usando este código.', 
                resultado: null
            });
        }

        // Verificar contrasena
        if (contrasena && contrasena !== confirmacionContrasena) {
            throw generarErrorCapaPresentacion({
                estado: 400, 
                codigo: 'contrasena_diferente_a_confirmacionContrasena', 
                mensaje: '[contrasena] y [confirmacionContrasena] son diferentes.', 
                resultado: null
            })
        }
        
        // Construccion del usuario actualizado
        const usuarioFormateado:any = {};
        const autenticacionFormateado:any = {};
        if (correo) usuarioFormateado.correo = correo;
        if (codigo) usuarioFormateado.codigo = codigo;
        if (nombre) usuarioFormateado.nombre = nombre;
        
        if (correo) autenticacionFormateado.correo = correo;
        if (contrasena) autenticacionFormateado.contrasena = contrasena;

        req.personalizado.usuarioFormateado = usuarioFormateado;
        req.personalizado.autenticacionFormateado = autenticacionFormateado;

        next()
    } catch (error) {
        next(error)
    }
}
