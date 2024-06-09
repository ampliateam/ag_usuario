import { envs } from "@global/configs/envs";
import { listaEnvironmentPermitido } from '@global/models/types';

export const validarEnvs = () => {
    // Verificacion del dato correcto del "environment"
    if (!listaEnvironmentPermitido.includes(envs.environment)) {
        throw new Error(`Environment inválido: ${envs.environment}`);
    }
    
    // Verificar PORTs de Docker (cuando es un entorno de remoto)
    if (envs.environment !== 'local_development' && (!envs.dockerPortExterno || !envs.dockerPortInterno)) {
        throw new Error('PORT de Docker inválido: Es necesario tener un PORT externo e interno');
    }
    
    // Verificar credenciales del usuario de este servicio
    if (!envs.codigoUsuarioExterno || !envs.contrasenaUsuarioExterno) {
        throw new Error('Credenciales de este servicio inválidos');
    }
}
