"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ventasDiaController_1 = require("../controllers/ventasDiaController");
class VentasDiasRoters {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/ingresarVenta/', ventasDiaController_1.ventasDiaController.ingresarVenta);
        this.router.get('/mostrarVentas/', ventasDiaController_1.ventasDiaController.mostrarVentas);
        this.router.delete('/LimpiarVentas/', ventasDiaController_1.ventasDiaController.LimpiarVentas);
    }
}
const ventasDiasRouter = new VentasDiasRoters();
exports.default = ventasDiasRouter.router;
