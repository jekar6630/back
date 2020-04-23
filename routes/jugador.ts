import { Router, Response } from 'express';
import { Jugador } from '../models/jugador.model';
import { verificarToken } from '../middlewares/autenticacion';

const jugadorRoutes = Router();

jugadorRoutes.post('/', [verificarToken], (req: any, res: Response) => {
    const body = req.body;
    body.usuario = req.usuario._id;

    Jugador.create( body ).then( async jugadorDB => {
        await jugadorDB.populate('usuario','-password').execPopulate();
        res.json({
            ok: true,
            jugador: jugadorDB
        });
    }).catch( err => {
         res.json(err);
    });
});

export default jugadorRoutes;