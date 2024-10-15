export interface IParametroSistema {
  id: string;
  parametroBusqueda: string;
  valor: string;
  observacion: string;
};

export interface IParametroSistemaOpcional {
  id?: string;
  parametroBusqueda?: string;
  valor?: string;
  observacion?: string;
};
