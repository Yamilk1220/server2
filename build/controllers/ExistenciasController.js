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
exports.existenciasController = void 0;
const database_1 = __importDefault(require("../database"));
class ExistenciasController {
    ingresarExistencia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const resp = yield database_1.default.query("INSERT INTO existencias set ?", [req.body]);
            console.log(resp);
            res.json(resp);
            if (resp.length > 0) {
                res.json(resp[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Estructura incorrecta' });
        });
    }
    mostrarExistencias(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM existencias');
            res.json(respuesta);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(405).json({ 'mensaje': 'Datos no encontrados' });
        });
    }
    actualizarExistencia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            //console.log(req.params);
            console.log(id);
            const resp = yield database_1.default.query("UPDATE existencias set ? WHERE id_existencia = ?", [req.body, id]);
            res.json(resp);
            if (resp.length > 0) {
                res.json(resp[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Estructura incorrecta' });
        });
    }
    EliminarExistencia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respon = yield database_1.default.query(`DELETE FROM existencias WHERE id_existencia = ${id}`);
            res.json(respon);
            if (respon.length > 0) {
                res.json(respon[0]);
                return;
            }
            res.status(405).json({ 'mensaje': 'Datos no encontrados' });
        });
    }
    ValidarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(req.body)
            const parametros = req.body;
            var consulta = `SELECT id_Rol, correo FROM usuarios WHERE correo = '${parametros.correo}' AND contrasena = '${parametros.contrasena}'`;
            const resp = yield database_1.default.query(consulta);
            if (resp.length > 0)
                res.json(resp);
            else
                res.json({ "id_Rol": "-1" });
            //res.json(null);
            //console.log(consulta);
        });
    }
}
exports.existenciasController = new ExistenciasController();
