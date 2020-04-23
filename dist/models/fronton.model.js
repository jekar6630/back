"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const frontonSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    inicio: {
        type: Date,
        required: [true, 'La hora de inicio es requerida']
    },
    termino: {
        type: Date,
        required: [true, 'La hora de fin es requerida']
    },
    ubicacion: {
        type: String,
        required: [true, 'La direccion es requerida']
    },
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El organizador del evento es necesario']
    },
    created: {
        type: Date
    },
    estatus: {
        type: Number,
        required: [true, 'El estatus de la jugada es necesario']
    },
    imagenes: [{
            type: String
        }],
    precio: {
        type: Number,
        required: [true, 'El costo por hora es obligatorio']
    },
    moneda: {
        type: String,
        required: [true, 'El tipo de moneda es obligatorio']
    }
});
frontonSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
exports.Fronton = mongoose_1.model('Fronton', frontonSchema);
