import * as service from "../service";

describe('CRUD - UsaurioPersona', () => {
    const timeoutValue = 60000;
    const uid = 'guillepaivag-5';
    const correo = 'guillepaivag@gmail.com';
    
    beforeAll(async () => {      
        // Eliminamos los usuarios de prueba
        const usuarioPersonaExistente = await service.crud.obtener({ correo });
        if (usuarioPersonaExistente) {
            await service.eliminarLogicamente({
                buscarPor: { correo },
                fechaEliminacion: new Date()
            });
        }

        const usuarioPersonaNuevo = await service.crud.crear({
            usuario: {
                uid,
                correo,
                codigo: 'guillepaivag',
                correoVerificado: false,
                nombre: 'Guillermo Paiva',
                telefono: '+595 982139653',
                fotoPerfil: '',
                rol: ['miembro', 'moderador'],
                estado: 'habilitado',
                fechaCreacion: new Date(),
                fechaEliminacion: null,
            }
        });

        expect(usuarioPersonaNuevo.uid).toEqual(uid);
        expect(usuarioPersonaNuevo.correo).toEqual(correo);
        expect(usuarioPersonaNuevo.codigo).toEqual('guillepaivag');
        expect(usuarioPersonaNuevo.nombre).toEqual('Guillermo Paiva');
        expect(usuarioPersonaNuevo.telefono).toEqual('+595 982139653');
    }, timeoutValue);
    
    test('Obtener usuario', async () => {
        const usuarioPersona = await service.crud.obtener({ correo });

        expect(usuarioPersona.uid).toEqual(uid);
        expect(usuarioPersona.correo).toEqual(correo);
        expect(usuarioPersona.codigo).toEqual('guillepaivag');
        expect(usuarioPersona.nombre).toEqual('Guillermo Paiva');
        expect(usuarioPersona.telefono).toEqual('+595 982139653');
    }, timeoutValue);
    
    test('Actualizar usuario', async () => {
        const usuarioPersona = await service.crud.actualizar({
            buscarPor: { correo },
            actualizado: {
                nombre: 'Guillermo José Paiva Galeano',
                telefono: '+595 981457080'
            }
        });

        expect(usuarioPersona.uid).toEqual(uid);
        expect(usuarioPersona.correo).toEqual(correo);
        expect(usuarioPersona.codigo).toEqual('guillepaivag');
        expect(usuarioPersona.nombre).toEqual('Guillermo José Paiva Galeano');
        expect(usuarioPersona.telefono).toEqual('+595 981457080');
    }, timeoutValue);

});
