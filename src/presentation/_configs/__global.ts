import { IPresentationSolicitante } from '@presentation/_models/interfaces';

interface Personalizado {
  momentoSolicitud?: Date;
  presentationSolicitante?: IPresentationSolicitante;
  // [key: string]: any;
};

declare global {
  namespace Express {
    interface Request {
      personalizado?: Personalizado;
    }
  }
};
