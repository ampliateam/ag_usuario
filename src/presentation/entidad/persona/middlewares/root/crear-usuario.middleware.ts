import { NextFunction, Request, Response } from 'express';
import { IUsuarioPersona } from '@global/models/interfaces';
import { services } from '@domain/services';
import { generarErrorCapaPresentacion } from '@presentation/_helpers/errors';
import { validarDTO } from '@presentation/_helpers';
import { CrearUsuarioDTO } from '@presentation/entidad/persona/models/dto';

export const crearUsuarioMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const crearUsuarioDTO = req.body as CrearUsuarioDTO;
        const { correo, nombre, codigo, contrasena, confirmacionContrasena } = crearUsuarioDTO;

        await validarDTO(crearUsuarioDTO);

        // Verificar existencia de correo
        const queryUsuarioPorCorreo = services.core.usuarioPersona.crud.obtener({ correo });
        const queryUsuarioPorCodigo = services.core.usuarioPersona.crud.obtener({ codigo });
        const [
            usuarioPorCorreo,
            usuarioPorCodigo
        ] = await Promise.all([queryUsuarioPorCorreo, queryUsuarioPorCodigo]);
        
        if (usuarioPorCorreo) {
            throw generarErrorCapaPresentacion({
                estado: 403, 
                codigo: 'correo_en_uso', 
                mensaje: 'Ya se está usando este correo.', 
                resultado: null
            });
        }

        if (usuarioPorCodigo) {
            throw generarErrorCapaPresentacion({
                estado: 403, 
                codigo: 'codigo_en_uso', 
                mensaje: 'Ya se está usando este código.', 
                resultado: null
            });
        }

        // Verificar contrasena
        if (contrasena !== confirmacionContrasena) {
            throw generarErrorCapaPresentacion({
                estado: 400, 
                codigo: 'contrasena_diferente_a_confirmacionContrasenaaaa', 
                mensaje: '[contrasena] y [confirmacionContrasena] son diferentes.', 
                resultado: null
            });
        }
        
        // Construccion del nuevo usuario
        const usuarioFormateado: IUsuarioPersona = {
            uid: '',
            correo,
            codigo,
            correoVerificado: false,
            nombre,
            telefono: '',
            fotoPerfil: '',
            rol: ['miembro'],
            estado: 'habilitado',
            fechaCreacion: req.personalizado.momentoSolicitud,
            fechaEliminacion: null
        };

        req.personalizado.usuarioFormateado = usuarioFormateado;

        next()
    } catch (error) {
        next(error)
    }
}
