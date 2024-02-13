import { Request,Response } from "express";
import pool from '../database';
class CategoriasController
{
    public async crearCategoria(req: Request, res: Response): Promise<void>{
        console.log(req.body)
        const resp = await pool.query("INSERT INTO categorias set ?",[req.body]);
        console.log(resp);
        res.json(resp);
        if(resp.length>0){
            res.json(resp[0]);
            return ;
        }
        res.status(404).json({'mensaje': 'Estructura incorrecta'});
    }
    public async mostrarCategorias(req: Request, res: Response ): Promise<void>{
        console.log("YA ESTAMOS AQUI");
        const respuesta = await pool.query('SELECT * FROM categorias');
        if(respuesta.length>0){
            res.json( respuesta );
            return ;
        }
        res.status(405).json({'mensaje': 'Datos no enconntrados'});
        }
}
export const categoriasController = new CategoriasController();