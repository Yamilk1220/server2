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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productosController = void 0;
const database_1 = __importDefault(require("../database"));
class ProductosController {
    crearProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            try {
                const resp = yield database_1.default.query("INSERT INTO productos (CodigoBarras, Nombre, Tipo, Marca, Precio, Cantidad) VALUES (?, ?, ?, ?, ?, ?)", [req.body.CodigoBarras, req.body.Nombre, req.body.Tipo, req.body.Marca, req.body.Precio, req.body.Cantidad]);
                if (resp.affectedRows > 0) {
                    res.status(200).json({ 'mensaje': 'Producto creado exitosamente' });
                }
                else {
                    res.status(402).json({ 'mensaje': 'No se pudo crear el producto' });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ 'mensaje': 'Error interno del servidor' });
            }
        });
    }
    mostrarProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Todo bien xd");
            const respuesta = yield database_1.default.query('SELECT * FROM productos');
            res.json(respuesta);
        });
    }
    EliminarProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query('DELETE FROM productos WHERE CodigoBarras = ?', [id]);
            if (resp.affectedRows > 0) {
                res.json({ mensaje: 'Producto eliminado correctamente' });
                return;
            }
            res.status(401).json({ mensaje: 'Producto no encontrado hermano' });
        });
    }
    BuscarName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("YA ESTAMOS AQUI");
            try {
                const { nombre } = req.params;
                const respuesta = yield database_1.default.query('SELECT * FROM productos WHERE CodigoBarras = ?', [nombre]);
                res.json(respuesta);
            }
            catch (error) {
                console.error('Error al ejecutar la consulta:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    restarCantidad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { codigoBarras, cantidadRestar } = req.body; // Asegúrate de enviar estos datos en el cuerpo de la solicitud
                // Consulta para restar la cantidad
                const respuesta = yield database_1.default.query('UPDATE productos SET cantidad = cantidad - ? WHERE CodigoBarras = ?', [cantidadRestar, codigoBarras]);
                res.json({ mensaje: `Cantidad restada correctamente para el CodigoBarras: ${codigoBarras}` });
            }
            catch (error) {
                console.error('Error al restar cantidad por CodigoBarras:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
}
exports.productosController = new ProductosController();
