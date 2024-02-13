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
exports.ventasTController = void 0;
const database_1 = __importDefault(require("../database"));
class VentasTController {
    NuevaVentaT(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Extraer los campos necesarios del cuerpo de la solicitud
                const { CodigoBarras, CantidadVendida, Total } = req.body;
                // Definir valores predeterminados o nulos para otros campos
                const FechaDeVenta = req.body.FechaDeVenta || null;
                // Otros campos aquí...
                // Crear un objeto con los campos a insertar
                const ventaData = {
                    CodigoBarras,
                    CantidadVendida,
                    FechaDeVenta,
                    Total,
                    // Otros campos aquí...
                };
                // Insertar en la base de datos
                const resp = yield database_1.default.query("INSERT INTO ventastemporales SET ?", [ventaData]);
                console.log(resp);
                res.json(resp);
            }
            catch (error) {
                console.error('Error al ingresar venta:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    MostrarVentaT(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM ventastemporales');
            res.json(respuesta);
        });
    }
    EliminarVenta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respon = yield database_1.default.query(`DELETE FROM ventastemporales WHERE VentaID = ${id}`);
            res.json(respon);
            if (respon.length > 0) {
                res.json(respon[0]);
                return;
            }
            res.status(401).json({ 'mensaje': 'Producto no encontrado' });
        });
    }
}
exports.ventasTController = new VentasTController();
