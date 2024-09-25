import { services } from '@domain/services';

describe('CRUD - UsaurioPersona', () => {
    const uid = 'developerprogrammer1617-0';
    const correo = 'developerprogrammer1617@gmail.com';
    
    test.skip('Crear', async () => {
        const nuevo = await services.core.usuarioPersona.crud.crear({
            usuario: {
                uid,
                correo,
                codigo: 'developerprogrammer1617',
                // correoVerificado: false,
                nombre: 'Developer Programmer',
                // telefono: '+595 982139653',
                // fotoPerfil: '',
                // rol: ['miembro', 'moderador'],
                // estado: 'habilitado',
                // fechaCreacion: new Date(),
                // fechaEliminacion: null,
            }
        });

        expect(nuevo.uid).toEqual(uid);
        expect(nuevo.correo).toEqual(correo);
        expect(nuevo.codigo).toEqual('developerprogrammer1617');
        expect(nuevo.nombre).toEqual('Developer Programmer');
        // expect(nuevo.telefono).toEqual('+595 982139653');
    });

    test.skip('Obtener', async () => {
        const obj = await services.core.usuarioPersona.crud.obtener({ correo });

        expect(obj.uid).toEqual(uid);
        expect(obj.correo).toEqual(correo);
        expect(obj.codigo).toEqual('developerprogrammer1617');
        expect(obj.nombre).toEqual('Developer Programmer');
        // expect(obj.telefono).toEqual('+595 982139653');
    });
    
    test.skip('Actualizar', async () => {
        const actualizado = await services.core.usuarioPersona.crud.actualizar({
            buscarPor: { correo },
            actualizado: {
                nombre: 'El developer',
                telefono: '+595 981696969'
            }
        });

        expect(actualizado).toBeTruthy();
        expect(actualizado.uid).toEqual(uid);
        expect(actualizado.correo).toEqual(correo);
        expect(actualizado.nombre).toEqual('El developer');
        expect(actualizado.telefono).toEqual('+595 981696969');
    });

    test.skip('Eliminar', async () => {
        const obj = await services.core.usuarioPersona.crud.obtener({ correo });
        const eliminado = await services.core.usuarioPersona.eliminarLogicamente({
            buscarPor: { uid: obj.uid },
            fechaEliminacion: new Date(),
        });
        const eliminado2 = await services.core.usuarioPersona.crud.obtener({ correo });

        expect(eliminado).toBeTruthy();
        expect(eliminado2).toBeFalsy();
    });
});
