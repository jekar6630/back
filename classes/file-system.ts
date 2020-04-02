import { FileUpload } from '../interfaces/file-upload';
import path from 'path';
import fs from 'fs';
import uniqid from 'uniqid';

export default class FileSystem {
    constructor (){};

    guardarImagenTemporal( file : FileUpload, userId : string){
        return new Promise((resolve, reject) => {
            const path = this.crearCarpetaUsuario(userId);
            const nombreArchivo = this.generarNombreUnico(file.name);
            file.mv(`${ path }/${ nombreArchivo }`, (err:any) => {
                if(err){
                    reject(err);
                }else{
                    resolve();
                }
            })
        });
    }

    private generarNombreUnico(original : string ){
        const nombreArr = original.split('.');
        const ext = nombreArr[nombreArr.length - 1];
        const namefile = uniqid();
        return `${ namefile }.${ ext }`;
    }

    private crearCarpetaUsuario(userId : string){
        const pathUser = path.resolve(__dirname, '../uploads/', userId);
        const pathUserTemp = pathUser + '/temp';

        const existe = fs.existsSync( pathUser );

        if(!existe){
            fs.mkdirSync(pathUser);
            fs.mkdirSync(pathUserTemp);
        }

        return pathUserTemp;

    }
}