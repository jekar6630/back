import { Router, Response } from 'express';
import { Jugada } from '../models/jugada.model';
import { verificarToken } from '../middlewares/autenticacion';

const juagadaRoutes = Router();

juagadaRoutes.post('/', [verificarToken], (req: any, res: Response) => {
    const body = req.body;
    body.usuario = req.usuario._id;

    Jugada.create( body ).then( async jugadaDB => {
        await jugadaDB.populate('usuario','-password').execPopulate();
        res.json({
            ok: true,
            jugada: jugadaDB
        });
    }).catch( err => {
         res.json(err);
    });
});

export default juagadaRoutes;