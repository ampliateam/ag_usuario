import * as crypto from 'crypto';
import { IAutenticacionExterno } from '@global/models/ag_usuario';
import { VerificarFirmaDTO } from "../../dto/verificar-firma.dto";
import { generarErrorCapaDomain, manejadorDeErrorFirebaseFirestore } from '@domain/_errors';
import * as services from '@domain/core/autenticacion-externo/service';

// Referenciar el manejador de error correspondiente
const manejadorDeError = manejadorDeErrorFirebaseFirestore;

export const verificarFirmaExterno = async (dto: VerificarFirmaDTO): Promise<IAutenticacionExterno> => {
  const { publicKey, timestamp, signature } = dto;

  try {
    // Buscar la `AutenticacionExterno` por la clave publica
    const autenticacionExterno = await services.crud.obtener({
      clavePublica: publicKey
    });
    if (!autenticacionExterno) return null;

    const dataToSign = `${autenticacionExterno.uid}${autenticacionExterno.clavePublica}${timestamp}`;
    const signatureGenerada = crypto
      .createHmac('sha256', autenticacionExterno.clavePrivada)
      .update(dataToSign)
      .digest('hex');

    if (signature !== signatureGenerada) {
      throw generarErrorCapaDomain({
        estado: 401,
        codigo: 'no_autorizado',
        mensajeServidor: `Firma inválida.`,
        mensajeCliente: `Firma inválida.`,
        resultado: null,
      });
    }

    return autenticacionExterno;
  } catch (error) {
    return manejadorDeError(error);
  }
};
