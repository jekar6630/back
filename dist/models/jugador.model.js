"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const jugadorSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    apellidos: {
        type: String,
        required: [true, 'Los apellidos son obligatorios']
    },
    sobrenombre: {
        type: String,
        required: [true, 'El sobrenombre es obligatorio']
    },
    categoria: {
        type: Number,
        required: [true, 'La categoria es obligatoria']
    },
    avatar: {
        type: String,
        default: 'av-1.png'
    },
    logros: {
        type: String,
        required: [true, 'Los logros son obligatorios']
    },
    created: {
        type: Date
    },
    estatus: {
        type: Number,
        required: [true, 'El estatus es obligatorio']
    }
});
exports.Jugador = mongoose_1.model('Jugador', jugadorSchema);
