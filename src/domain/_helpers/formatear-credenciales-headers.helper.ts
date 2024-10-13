import { ICredencialUsuario } from "@global/models/_system";

export const formatearCredencialesHeaders = (cu: ICredencialUsuario) => {
  const data = cu[cu.tipo];

  const headersCredPersona = {
    Authorization: `Bearer ${data.token}`
  };
  const headersCredExterno = {
    'X-Public-Key': data.publicKey,
    'X-Timestamp': data.timestamp,
    'X-Signature': data.signature,
  };

  if (cu.tipo === 'persona') return headersCredPersona;
  else if (cu.tipo === 'externo') return headersCredExterno;
  else return {};
};
