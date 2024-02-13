import { Request,Response } from "express";
import pool from '../database';
class VentasTController
{
    public async NuevaVentaT(req: Request, res: Response): Promise<void> {
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
            const resp = await pool.query("INSERT INTO ventastemporales SET ?", [ventaData]);
    
            console.log(resp);
            res.json(resp);
        } catch (error) {
            console.error('Error al ingresar venta:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
    
    
    
    public async MostrarVentaT(req: Request, res: Response ): Promise<void>{
        const respuesta = await pool.query('SELECT * FROM ventastemporales');
        res.json( respuesta );
        }

    public async EliminarVenta(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const respon = await pool.query(`DELETE FROM ventastemporales WHERE VentaID = ${id}`);
        res.json( respon);
            if(respon.length>0){
                res.json(respon[0]);
                return ;
            }
            res.status(401).json({'mensaje': 'Producto no encontrado'});
        }
}
export const ventasTController = new VentasTController();