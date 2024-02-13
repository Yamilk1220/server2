"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const productosRoutes_1 = __importDefault(require("./routes/productosRoutes"));
//mport categoriasRoutes from './routes/categoriasRoutes';
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const categoriasRouters_1 = __importDefault(require("./routes/categoriasRouters"));
const ventasTRoutes_1 = __importDefault(require("./routes/ventasTRoutes"));
const existenciasRoutes_1 = __importDefault(require("./routes/existenciasRoutes"));
const ventasDiasRouter_1 = __importDefault(require("./routes/ventasDiasRouter"));
const ususariosRoutes_1 = __importDefault(require("./routes/ususariosRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
        this.app.use('/documentacion', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
    }
    config() {
        this.app.set('port', process.env.PORT || 80);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use(indexRoutes_1.default);
        this.app.use('/api/productos', productosRoutes_1.default);
        this.app.use('/api/categorias', categoriasRouters_1.default);
        this.app.use('/api/ventasDiarias', ventasDiasRouter_1.default);
        this.app.use('/api/ventasTemporales', ventasTRoutes_1.default);
        this.app.use('/api/existencias', existenciasRoutes_1.default);
        this.app.use('/api/usuarios', ususariosRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
