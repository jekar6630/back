"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jugador_model_1 = require("../models/jugador.model");
const autenticacion_1 = require("../middlewares/autenticacion");
const jugadorRoutes = express_1.Router();
jugadorRoutes.post('/', [autenticacion_1.verificarToken], (req, res) => {
    const body = req.body;
    body.usuario = req.usuario._id;
    jugador_model_1.Jugador.create(body).then((jugadorDB) => __awaiter(void 0, void 0, void 0, function* () {
        yield jugadorDB.populate('usuario', '-password').execPopulate();
        res.json({
            ok: true,
            jugador: jugadorDB
        });
    })).catch(err => {
        res.json(err);
    });
});
exports.default = jugadorRoutes;
