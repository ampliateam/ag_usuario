import { services } from '@domain/services';

describe('CRUD - AutenticacionPersona', () => {
    const correo = 'developerprogrammer1617@gmail.com';

    test.skip('Crear', async () => {
        // Crear autenticacion persona
        const nuevo = await services.core.autenticacionPersona.crearConCorreoContrasena({
            correo,
            contrasena: '123456'
        });
        expect(nuevo.correo).toEqual(correo);
    });

    test.skip('Obtener', async () => {
        const obj = await services.core.autenticacionPersona.crud.obtener({ correo });

        expect(obj.correo).toEqual(correo);
        expect(obj.deshabilitado).toEqual(false);
    });

    test.skip('Actualizar', async () => {
        const actualizado = await services.core.autenticacionPersona.crud.actualizar({
            buscarPor: { correo },
            actualizado: { deshabilitado: false }
        });

        expect(actualizado.correo).toEqual(correo);
        expect(actualizado.deshabilitado).toEqual(false);
    });

    test.skip('Eliminar', async () => {
        const obj = await services.core.autenticacionPersona.crud.obtener({ correo });
        const eliminado = await services.core.autenticacionPersona.crud.eliminar({
            buscarPor: { uid: obj.uid }
        });
        const eliminado2 = await services.core.autenticacionPersona.crud.obtener({ correo });

        expect(eliminado).toBeTruthy();
        expect(eliminado2).toBeFalsy();
    });
});
