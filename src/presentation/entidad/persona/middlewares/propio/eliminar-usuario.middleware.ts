import { NextFunction, Request, Response } from 'express';

export const verificarEliminacionUsuario = async (req: Request, res: Response, next: NextFunction) => {
    try {
        next()
    } catch (error) {
        next(error)
    }
}
