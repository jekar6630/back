import { Response, Request, NextFunction } from 'express';
import Token from '../classes/token';

export const verificarToken = (req: any, res: Response, next: NextFunction) => {
    const userToken = req.get('x-token') || '';
    Token.comprobateToken( userToken )
        .then( (decoded: any) => {
            req.usuario = decoded.usuario;
            next();
        })
        .catch( err => {
            res.json({
                ok: false,
                mensaje: "Token incorrecto"
            });
        });
}