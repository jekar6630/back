import { Schema, model, Document } from "mongoose";
import bcrypt from 'bcrypt';

const usuarioSchema = new Schema({
    nombre:{
        type: String,
        required: [ true, 'El nombre es obligatorio']
    },
    apellidos:{
        type: String,
        required: [ true, 'Los apellidos son obligatorios']
    },
    sobrenombre:{
        type: String
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
    },
    created:{
        type: Date
    },
    type:{
        type: Number,
        required:[ true, 'El tipo del usuario es obligatorio']
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
    apellidos: string;
    sobrenombre: string;
    avatar: string;
    email: string;
    password: string;
    created: Date;
    type: number;

    compararPassword(password: string) : boolean;
}

export const Usuario = model<IUsuario>('Usuario', usuarioSchema);
