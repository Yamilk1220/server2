"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const existenciasController_1 = require("../controllers/existenciasController");
class existenciasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/mostrarExistencias/', existenciasController_1.existenciasController.mostrarExistencias);
        this.router.post('/ingresarExistencia/', existenciasController_1.existenciasController.ingresarExistencia);
        this.router.delete('/EliminarExistencia/:id', existenciasController_1.existenciasController.EliminarExistencia);
        this.router.put('/actualizarExistencia/:id', existenciasController_1.existenciasController.actualizarExistencia);
        this.router.post('/ValidarUsuario/', existenciasController_1.existenciasController.ValidarUsuario);
    }
}
const ExistenciasRoutes = new existenciasRoutes();
exports.default = ExistenciasRoutes.router;
