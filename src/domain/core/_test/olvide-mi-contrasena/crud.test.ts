import { services } from '@domain/services';

describe('CRUD - OlvideMiContrasena', () => {
    const uidUsuario = 'developerprogrammer1617-0';
    
    test.skip('Crear', async () => {
        const nuevo = await services.core.olvideMiContrasena.crud.crear({
            olvideMiContrasena: { uidUsuario }
        });

        expect(nuevo).toBeTruthy();
        expect(nuevo.uidUsuario).toEqual(uidUsuario);
    });

    test.skip('Obtener', async () => {
        const id = 'ZpgpsFCDZUudNrHpcApH';
        const obj = await services.core.olvideMiContrasena.crud.obtener({ id });

        expect(obj).toBeTruthy();
        expect(obj.id).toEqual(id);
    });
    
    test.skip('Actualizar', async () => {
        const id = 'ZpgpsFCDZUudNrHpcApH';
        const actualizado = await services.core.olvideMiContrasena.crud.actualizar({
            buscarPor: { id },
            actualizado: { estado: 'aprobado' }
        });

        expect(actualizado).toBeTruthy();
        expect(actualizado.estado).toEqual('aprobado');
    });
});
