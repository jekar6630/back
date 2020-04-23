import { Schema, model, Document } from "mongoose";

const jugadorSchema = new Schema({
    nombre:{
        type: String,
        required: [ true, 'El nombre es obligatorio']
    },
    apellidos:{
        type: String,
        required: [ true, 'Los apellidos son obligatorios']
    },
    sobrenombre:{
        type: String,
        required: [ true, 'El sobrenombre es obligatorio']
    },
    categoria:{
        type: Number,
        required: [ true, 'La categoria es obligatoria']
    },
    avatar:{
        type: String,
        default: 'av-1.png'
    },
    logros:{
        type: String,
        required: [ true, 'Los logros son obligatorios']
    },
    created:{
        type: Date
    },
    estatus:{
        type: Number,
        required: [ true, 'El estatus es obligatorio']
    }
});

interface IJugador extends Document{
    nombre: string;
    apellidos: string;
    sobrenombre: string;
    categoria: Number;
    avatar: string;
    logros: string;
    created: Date;
    estatus: Number;
}

export const Jugador = model<IJugador>('Jugador', jugadorSchema);
