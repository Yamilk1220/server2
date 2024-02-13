import { Request,Response } from "express";
import pool from '../database';
class UsuariosCotroller
{
    public async ValidarUsuario(req: Request, res: Response): Promise<void> {
        try {
            const parametros = req.body;
            const consulta = `
                SELECT *
                FROM usuarios
                WHERE correo = ? AND Contrasena = ?
            `;
    
            const result = await pool.query(consulta, [parametros.correo, parametros.Contrasena]);
    
            if (result && result.length > 0) {
                res.json({ "mensaje": "Coincidencia encontrada", "datos": result });
            } else {
                res.json({ "mensaje": "No se encontraron coincidencias" });
            }
        } catch (error) {
            console.error('Error al ejecutar la consulta:', error);
            res.status(500).json({ "mensaje": "Error interno del servidor" });
        }
    }
    
    
    
    
    public async createUsuario(req: Request, res: Response): Promise<void> {
        //console.log(req.body)
        const resp = await pool.query("INSERT INTO usuarios set ?",[req.body]);
        res.json(resp);
        //res.json(null);
    }

    public async actualizarUsuario(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        //console.log(req.params);
        console.log(id);
        const resp = await pool.query("UPDATE usuarios set ? WHERE id = ?", [req.body, id]);
        res.json(resp);
        //res.json(null);
    }
    
    public async eliminarUsuario(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query(`DELETE FROM usuarios WHERE id = ${id}`);
        res.json(resp);
    }
    
}

export const usuariosControllers = new UsuariosCotroller();