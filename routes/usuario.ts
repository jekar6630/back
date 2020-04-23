import { Router, Request, Response } from "express";
import { Usuario } from '../models/usuario.model';
import bcrypt from "bcrypt";
import Token from '../classes/token';
import { verificarToken } from '../middlewares/autenticacion';

const userRoutes = Router();

userRoutes.post('/create', ( req: Request , res: Response ) => {
    const user = {
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        sobrenombre: req.body.sobrenombre,
        avatar: req.body.avatar,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        type: req.body.type
    }

    Usuario.create(user).then( userDB => {
        console.log(userDB);
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

userRoutes.get('/',[verificarToken], (req: any, res: Response) => {
    const usuario = req.usuario;

    res.json({
        ok: "true",
        usuario
    });
});
export default userRoutes;