import Server from './classes/server';
import userRoutes from './routes/usuario';
import mongoose from "mongoose";

const server = new Server();
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