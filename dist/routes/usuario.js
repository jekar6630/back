"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoutes = express_1.Router();
userRoutes.get('/prueba', (req, res) => {
    res.json({
        ok: true,
        mes: "Todo ok"
    });
});
exports.default = userRoutes;
