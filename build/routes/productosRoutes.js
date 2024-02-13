"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productosController_1 = require("../controllers/productosController");
class ProductosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/crearProducto/', productosController_1.productosController.crearProducto);
        this.router.get('/MostrarProducto/', productosController_1.productosController.mostrarProducto);
        this.router.delete('/EliminarProducto/:id', productosController_1.productosController.EliminarProducto);
        this.router.get('/BuscarName/:nombre', productosController_1.productosController.BuscarName);
        this.router.put(`/restarCantidad/`, productosController_1.productosController.restarCantidad);
    }
}
const productosRoutes = new ProductosRoutes();
exports.default = productosRoutes.router;
