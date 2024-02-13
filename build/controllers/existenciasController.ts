import { Request,Response } from "express";
import pool from '../database';
class ExistenciasController
{
    public async ingresarExistencia(req: Request, res: Response): Promise<void>{
        console.log(req.body)
        const resp = await pool.query("INSERT INTO existencias set ?",[req.body]);
        console.log(resp);
        res.json(resp);
        if(resp.length>0){
            res.json(resp[0]);
            return ;
        }
        res.status(404).json({'mensaje': 'Estructura incorrecta'});
    }
    public async mostrarExistencias(req: Request, res: Response ): Promise<void>{
        const respuesta = await pool.query('SELECT * FROM existencias');
        res.json( respuesta );
        if(respuesta.length>0){
            res.json(respuesta[0]);
            return ;
        }
        res.status(405).json({'mensaje': 'Datos no encontrados'});
        }

        public async actualizarExistencia(req: Request, res: Response): Promise<void> {
            const { id } = req.params;
            //console.log(req.params);
            console.log(id);
            const resp = await pool.query("UPDATE existencias set ? WHERE id_existencia = ?", [req.body, id]);
            res.json(resp);
            if(resp.length>0){
                res.json(resp[0]);
                return ;
            }
            res.status(404).json({'mensaje': 'Estructura incorrecta'});
        }
         
        public async EliminarExistencia(req: Request, res: Response): Promise<void>{
            const { id } = req.params;
            const respon = await pool.query(`DELETE FROM existencias WHERE id_existencia = ${id}`);
            res.json( respon);
            if(respon.length>0){
                res.json(respon[0]);
                return ;
            }
            res.status(405).json({'mensaje': 'Datos no encontrados'});
        }

        public async ValidarUsuario(req: Request, res: Response): Promise<void> {
            //console.log(req.body)
            const parametros = req.body;
            var consulta = `SELECT id_Rol, correo FROM usuarios WHERE correo = '${parametros.correo}' AND contrasena = '${parametros.contrasena}'`;
            const resp = await pool.query(consulta);
            if(resp.length>0)
                res.json(resp);
            else
                res.json({"id_Rol":"-1"});
            //res.json(null);
            //console.log(consulta);
        }
}
export const existenciasController = new ExistenciasController();