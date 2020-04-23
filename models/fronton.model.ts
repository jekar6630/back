import { Schema, model, Document } from "mongoose";

const frontonSchema = new Schema({
    nombre: {
        type: String,
        required: [ true, 'El nombre es necesario']
    },
    inicio: {
        type: Date,
        required: [ true, 'La hora de inicio es requerida']
    },
    termino:{
        type: Date,
        required: [ true, 'La hora de fin es requerida']
    },
    ubicacion:{
        type: String,
        required: [ true, 'La direccion es requerida']
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [ true, 'El organizador del evento es necesario']
    },
    created:{
        type: Date
    },
    estatus:{
        type: Number,
        required: [ true, 'El estatus de la jugada es necesario']
    },
    imagenes:[{
        type: String
    }],
    precio:{
        type: Number,
        required: [ true, 'El costo por hora es obligatorio']
    },
    moneda:{
        type: String,
        required: [ true, 'El tipo de moneda es obligatorio']
    }
});

frontonSchema.pre<IFronton>('save',function(next){
    this.created = new Date();
    next();
})

interface IFronton extends Document{
    nombre: String;
    inicio: Date;
    termino: Date;
    ubicacion: String;
    usuario: String;
    created: Date;
    estatus: Number;
    imagenes: String[];
    precio: Number;
    moneda: String;
}

export const Fronton = model<IFronton>('Fronton',frontonSchema);