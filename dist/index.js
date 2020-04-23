"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const post_1 = __importDefault(require("./routes/post"));
const jugada_1 = __importDefault(require("./routes/jugada"));
const fronton_1 = __importDefault(require("./routes/fronton"));
const jugador_1 = __importDefault(require("./routes/jugador"));
const server = new server_1.default();
//Body parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//File upload
server.app.use(express_fileupload_1.default({ useTempFiles: true }));
//Config cors
server.app.use(cors_1.default({ origin: true, credentials: true }));
//Rutas del app
server.app.use('/user', usuario_1.default);
server.app.use('/post', post_1.default);
server.app.use('/jugada', jugada_1.default);
server.app.use('/fronton', fronton_1.default);
server.app.use('/jugador', jugador_1.default);
//Db mongoose
mongoose_1.default.connect('mongodb://localhost:27017/fotosgram', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
    if (err)
        throw err;
    console.log('bd online');
});
server.start(() => {
    console.log(`Servidor corriendo--- ${server.port}`);
});
