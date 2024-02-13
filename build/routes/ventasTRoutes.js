"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ventasTController_1 = require("../controllers/ventasTController");
class VentasTRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/NuevaVentaT/', ventasTController_1.ventasTController.NuevaVentaT);
        this.router.get('/MostrarVentaT/', ventasTController_1.ventasTController.MostrarVentaT);
        this.router.delete('/eliminarVentas/:id', ventasTController_1.ventasTController.EliminarVenta);
    }
}
const ventasTRoutes = new VentasTRoutes();
exports.default = ventasTRoutes.router;
