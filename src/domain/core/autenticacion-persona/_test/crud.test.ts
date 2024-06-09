import * as service from "../service";

describe('CRUD - AutenticacionPersona', () => {
    const timeoutValue = 60000;
    const correo = 'guillepaivag@gmail.com';

    beforeAll(async () => {
        // Eliminamos los usuarios de prueba
        const autenticacionPersonaExistente = await service.crud.obtener({ correo });
        if (autenticacionPersonaExistente) {
            await service.crud.eliminar({ buscarPor: { uid: autenticacionPersonaExistente.uid } });
        }

        // Crear autenticacion persona
        const autenticacionPersona = await service.crearConCorreoContrasena({
            correo,
            contrasena: '123456'
        });
        expect(autenticacionPersona.correo).toEqual(correo);
    }, timeoutValue);

    test('Obtener un usuario por correo', async () => {
        const autenticacionPersona = await service.crud.obtener({ correo });

        expect(autenticacionPersona.correo).toEqual(correo);
        expect(autenticacionPersona.deshabilitado).toEqual(false);
    }, timeoutValue);

    test('Actualizar un usuario por correo', async () => {
        const autenticacionPersona = await service.crud.actualizar({
            buscarPor: { correo },
            actualizado: { deshabilitado: true }
        });

        expect(autenticacionPersona.correo).toEqual(correo);
        expect(autenticacionPersona.deshabilitado).toEqual(true);
    }, timeoutValue);
});
