"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuariosControllers_1 = require("../controllers/usuariosControllers");
class UsuariosContorller {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/crearUsuario/', usuariosControllers_1.usuariosControllers.createUsuario);
        this.router.put('/actualizarUsuario/:id', usuariosControllers_1.usuariosControllers.actualizarUsuario);
        this.router.delete('/eliminarUsuario/:id', usuariosControllers_1.usuariosControllers.eliminarUsuario);
        this.router.post('/ValidarUsuario/', usuariosControllers_1.usuariosControllers.ValidarUsuario);
    }
}
const usuarioContorler = new UsuariosContorller();
exports.default = usuarioContorler.router;
