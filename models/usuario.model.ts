import { Schema, model, Document } from "mongoose";
import bcrypt from 'bcrypt';

const usuarioSchema = new Schema({
    nombre:{
        type: String,
        required: [ true, 'El nombre es obligatorio']
    },
    avatar:{
        type: String,
        default: 'av-1.png'
    },
    email:{
        type: String,
        unique: true,
        required:[ true, 'El correo es obligatrio' ]
    },
    password:{
        type: String,
        required:[ true, 'La contrseña es obligatoria' ]
    }
});

usuarioSchema.method('compararPassword', function(password: String = '') : boolean {
    if(bcrypt.compareSync(password, this.password)){
        return true;
    }
    return false;
});

interface IUsuario extends Document{
    nombre: string;
    email: string;
    password: string;
    avatar: string;

    compararPassword(password: string) : boolean;
}

export const Usuario = model<IUsuario>('Usuario', usuarioSchema);