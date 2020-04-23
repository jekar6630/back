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

juagadaRoutes.get('/', [verificarToken], async (req: any, res: Response) => {
    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;
    const body = req.body;
    console.log('body: '+body);
    body.usuario = req.usuario._id;
    console.log('usuario: '+body.usuario);

    const jugadas = await Jugada.find({ usuario: body.usuario })
                            .sort({ _id: -1})
                            .skip(skip)
                            .limit(10)
                            .populate('usuario','-password')
                            .exec();
    console.log(jugadas);

    res.json({
        ok: true,
        post: "success",
        jugadas: jugadas
    });
});

export default juagadaRoutes;