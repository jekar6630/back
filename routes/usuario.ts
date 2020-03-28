import { Router, Request, Response } from "express";
import { Usuario } from '../models/usuario.model';
import bcrypt from "bcrypt";
import Token from '../classes/token';
import { verificarToken } from '../middlewares/autenticacion';

const userRoutes = Router();

userRoutes.get('/prueba', ( req, res ) => {
    res.json({
        ok: true,
        mes: "Todo ok"
    })
});

userRoutes.post('/create', ( req: Request , res: Response ) => {
    const user = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        avatar: req.body.avatar
    }

    Usuario.create(user).then( userDB => {
        const tokenUsuario = Token.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar
        });
        res.json({
            ok: true,
            user: tokenUsuario
        });
    }).catch( err => {
        res.json({
            ok: false,
            err
        })
    });
});

userRoutes.post('/login', ( req: Request, res: Response ) => {
    const body = req.body;
    Usuario.findOne({ email: body.email }, (err, userDB) =>{
        if( err ) throw err;

        if(!userDB){
            return res.json({
                ok: false,
                mensaje: "Usuario/contraseña invalidos"
            })
        }

        if(userDB.compararPassword(body.password)){
            const tokenUsuario = Token.getJwtToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                email: userDB.email,
                avatar: userDB.avatar
            });
            res.json({
                ok: true,
                token: tokenUsuario
            })
        }else{
            return res.json({
                ok: false,
                mensaje: "Usuario/contraseña invalidos ***"
            })
        }
    })
});


userRoutes.post('/update', verificarToken, ( req: any, res: Response ) => {
    const user = {
        nombre: req.body.nombre || req.usuario.nombre,
        email: req.body.email || req.usuario.email,
        avatar: req.body.avatar || req.usuario.avatar
    }

    Usuario.findByIdAndUpdate( req.usuario._id, user, {new: true}, (err, userDB) => {
        if(err) throw err;

        if(!userDB){
            return res.json({
                ok: false,
                mensaje: "No existe un usuario con ese id"
            });
        }

        const tokenUsuario = Token.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar
        });

        res.json({
            ok: true,
            token: tokenUsuario
        });
    });
});

export default userRoutes;