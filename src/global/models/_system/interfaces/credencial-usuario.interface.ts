export interface ICredencialUsuario {
  tipo: 'persona' | 'externo' | 'desconocido';
  persona?: {
    token: string;
  };
  externo?: {
    publicKey: string;
    timestamp: number;
    signature: string;
  };
};
