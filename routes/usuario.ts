import { Router } from "express";

const userRoutes = Router();
userRoutes.get('/prueba', ( req, res ) => {
    res.json({
        ok: true,
        mes: "Todo ok"
    })
});

export default userRoutes;