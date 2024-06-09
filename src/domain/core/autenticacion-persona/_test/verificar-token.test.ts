import * as service from "../service";

describe('Verificar token - AutenticacionPersona', () => {
    const timeoutValue = 60000;
    const correo = 'guillepaivag@gmail.com';
    const token = 'UN_LINDO_TOKEN_UwU';

    // beforeAll(async () => {
    //     expect(true).toEqual(true);
    // }, timeoutValue);

    test.skip('Verificar token', async () => {
        const tokenDecodificadoPersona = await service.verificarToken(token);
        expect(tokenDecodificadoPersona.email).toEqual(correo);
    }, timeoutValue);
});
