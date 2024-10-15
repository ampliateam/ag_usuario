export interface IRespuestaServidor {
  exito: boolean;
  mensaje: string;
  resultado: any;
  nombreServicio: string;
};

export interface IRespuestaServidorOpcional {
  exito?: boolean;
  mensaje?: string;
  resultado?: any;
  nombreServicio?: string;
};
