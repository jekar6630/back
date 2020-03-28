import Server from './classes/server';
import userRoutes from './routes/usuario';
import mongoose from "mongoose";
import bodyParser from "body-parser";

const server = new Server();
//Body parser
server.app.use( bodyParser.urlencoded({extended:true}));
server.app.use( bodyParser.json());
//Rutas del app
server.app.use('/user', userRoutes );
//Db mongoose
mongoose.connect('mongodb://localhost:27017/fotosgram',
                 { useNewUrlParser: true, useCreateIndex: true}, ( err ) => {

                    if(err) throw err;

                    console.log('bd online');
                 });

server.start(() =>{
    console.log(`Servidor corriendo ${ server.port }`);
});