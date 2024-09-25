import { IAutenticacionPersona } from '@global/models/interfaces';
import { firebaseAuthentication } from '@domain/_connections/firebase';
import { userRecordToAutenticacionPersona } from '@domain/_helpers';
import { generarErrorCapaDomain, manejadorDeErrorFirebaseAuthentication } from '@domain/_helpers/errors';
import { CrearConCorreoContrasenaDTO } from '../../dto';

export const crearConCorreoContrasena = async (dto: CrearConCorreoContrasenaDTO): Promise<IAutenticacionPersona> => {
  try {
    const { dataConstruirDatos } = middleware(dto);

    // Crear usuario
    const userRecord = await firebaseAuthentication.createUser(dataConstruirDatos);

    // Parsea el objeto 'UserRecord' a 'AutenticacionPersona'
    return userRecordToAutenticacionPersona(userRecord);
  } catch (error) {
    return manejadorDeErrorFirebaseAuthentication(error);
  }
};

const middleware = (dto: CrearConCorreoContrasenaDTO) => {
  // Verificar datos requeridos
  if (!dto.correo || !dto.contrasena) {
    throw generarErrorCapaDomain({
      estado: 409,
      codigo: 'datos_invalidos',
      mensaje: 'Se necesita [correo] y [contrasena] para crear un usuario.',
      resultado: null,
    });
  }

  // Verificar tipo de datos
  if (typeof dto.correo !== 'string') {
    throw generarErrorCapaDomain({
      estado: 409,
      codigo: 'error_tipo_de_dato',
      mensaje: 'El correo tiene que ser [string].',
      resultado: null,
    });
  }

  if (typeof dto.contrasena !== 'string') {
    throw generarErrorCapaDomain({
      estado: 409,
      codigo: 'error_tipo_de_dato',
      mensaje: 'El correo tiene que ser [string].',
      resultado: null,
    });
  }

  // Verificar consistencia de datos
  // ...

  // Construir datos
  const dataConstruirDatos = {
    email: dto.correo,
    password: dto.contrasena,
  };

  return { dataConstruirDatos };
};
