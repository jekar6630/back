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
const jugada_model_1 = require("../models/jugada.model");
const autenticacion_1 = require("../middlewares/autenticacion");
const juagadaRoutes = express_1.Router();
juagadaRoutes.post('/', [autenticacion_1.verificarToken], (req, res) => {
    const body = req.body;
    body.usuario = req.usuario._id;
    jugada_model_1.Jugada.create(body).then((jugadaDB) => __awaiter(void 0, void 0, void 0, function* () {
        yield jugadaDB.populate('usuario', '-password').execPopulate();
        res.json({
            ok: true,
            jugada: jugadaDB
        });
    })).catch(err => {
        res.json(err);
    });
});
juagadaRoutes.get('/', [autenticacion_1.verificarToken], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;
    const body = req.body;
    console.log('body: ' + body);
    body.usuario = req.usuario._id;
    console.log('usuario: ' + body.usuario);
    const jugadas = yield jugada_model_1.Jugada.find({ usuario: body.usuario })
        .sort({ _id: -1 })
        .skip(skip)
        .limit(10)
        .populate('usuario', '-password')
        .exec();
    console.log(jugadas);
    res.json({
        ok: true,
        post: "success",
        jugadas: jugadas
    });
}));
exports.default = juagadaRoutes;
