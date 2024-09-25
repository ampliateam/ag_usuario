import { services } from '@domain/services';

describe('Verificar token - AutenticacionPersona', () => {
    const correo = 'guillepaivag@gmail.com';
    const token = 'UN_LINDO_TOKEN_UwU';

    test.skip('Verificar token', async () => {
        const tokenDecodificadoPersona = await services.core.autenticacionPersona.verificarToken(token);
        expect(tokenDecodificadoPersona).toBeTruthy();
        expect(tokenDecodificadoPersona.email).toEqual(correo);
    });
});
