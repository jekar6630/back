import { Router, Response } from 'express';
import { Fronton } from '../models/fronton.model';
import { verificarToken } from '../middlewares/autenticacion';

const frontonRoutes = Router();

frontonRoutes.post('/', [verificarToken], (req: any, res: Response) => {
    const body = req.body;
    body.usuario = req.usuario._id;

    Fronton.create( body ).then( async frontonDB => {
        await frontonDB.populate('usuario','-password').execPopulate();
        res.json({
            ok: true,
            fronton: frontonDB
        });
    }).catch( err => {
         res.json(err);
    });
});

export default frontonRoutes;