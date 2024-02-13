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
exports.usuariosControllers = void 0;
const database_1 = __importDefault(require("../database"));
class UsuariosCotroller {
    ValidarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const parametros = req.body;
                const consulta = `
                SELECT *
                FROM usuarios
                WHERE correo = ? AND Contrasena = ?
            `;
                const result = yield database_1.default.query(consulta, [parametros.correo, parametros.Contrasena]);
                if (result && result.length > 0) {
                    res.json({ "mensaje": "Coincidencia encontrada", "datos": result });
                }
                else {
                    res.json({ "mensaje": "No se encontraron coincidencias" });
                }
            }
            catch (error) {
                console.error('Error al ejecutar la consulta:', error);
                res.status(500).json({ "mensaje": "Error interno del servidor" });
            }
        });
    }
    createUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(req.body)
            const resp = yield database_1.default.query("INSERT INTO usuarios set ?", [req.body]);
            res.json(resp);
            //res.json(null);
        });
    }
    actualizarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            //console.log(req.params);
            console.log(id);
            const resp = yield database_1.default.query("UPDATE usuarios set ? WHERE id = ?", [req.body, id]);
            res.json(resp);
            //res.json(null);
        });
    }
    eliminarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM usuarios WHERE id = ${id}`);
            res.json(resp);
        });
    }
}
exports.usuariosControllers = new UsuariosCotroller();
