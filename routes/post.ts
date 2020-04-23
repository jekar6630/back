import { Router, Response} from 'express';
import { verificarToken } from '../middlewares/autenticacion';
import { Post } from '../models/post.model';
import { FileUpload } from '../interfaces/file-upload';
import FileSystem from '../classes/file-system';

const postRoutes = Router();
const fileSystem = new FileSystem();

postRoutes.get('/', async (req: any, res: Response) => {
    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;

    const posts = await Post.find()
                            .sort({ _id: -1})
                            .skip(skip)
                            .limit(10)
                            .populate('usuario','-password')
                            .exec();

    res.json({
        ok: true,
        post: "de acuerdo",
        posts: posts
    });
});

postRoutes.post('/', [verificarToken], (req: any, res: Response) => {
    const body = req.body;
    body.usuario = req.usuario._id;
    
    const imagenes = fileSystem.moveTempPost(req.usuario._id);
    body.imgs = imagenes;

    Post.create( body ).then( async postDB => {
        await postDB.populate('usuario','-password').execPopulate();
        res.json({
            ok: true,
            post: postDB
        });
    }).catch( err => {
         res.json(err);
    });
});

//Servicios para subir archivos
postRoutes.post('/upload', [verificarToken], async (req: any, res: Response) => {

    if(!req.files){
        return res.status(400).json({
            ok: true,
            mensaje: "No se subio el archivo"
        });
    }

    const file: FileUpload = req.files.image;

    if(!file){
        return res.status(400).json({
            ok: true,
            mensaje: "No se subio el archivo image"
        });
    }

    if( !file.mimetype.includes('image') ){
        return res.status(400).json({
            ok: true,
            mensaje: "No se subio una imagen valida"
        });
    }

    await fileSystem.guardarImagenTemporal(file, req.usuario._id);

    res.json({
        ok: true,
        mensaje: "de acuerdo",
        file: file.mimetype
    });
});

postRoutes.get('/imagen/:userid/:img', (req: any, res: Response) => {
    const userId = req.params.userid;
    const img = req.params.img;
    const photo = fileSystem.getFotoUrl(userId, img);
    res.sendFile(photo);
});

export default postRoutes;