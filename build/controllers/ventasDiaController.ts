import { Request,Response } from "express";
import pool from '../database';
class VentasDiaController
{
    public async ingresarVenta(req: Request, res: Response): Promise<void> {
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
            const resp = await pool.query("INSERT INTO ventasdiarias SET ?", [ventaData]);
    
            console.log(resp);
            res.json(resp);
        } catch (error) {
            console.error('Error al ingresar venta:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
    
    public async mostrarVentas(req: Request, res: Response ): Promise<void>{
        console.log("YA ESTAMOS AQUI");
        const respuesta = await pool.query('SELECT * FROM ventasdiarias');
        res.json( respuesta );
        }

        public async LimpiarVentas(req: Request, res: Response): Promise<void> {
            try {
              const respuesta = await pool.query('DELETE FROM ventasdiarias');
              res.json({ mensaje: 'Registros de ventasdiarias eliminados correctamente.' });
            } catch (error) {
              console.error('Error al eliminar registros de ventasdiarias:', error);
              res.status(500).json({ error: 'Error interno del servidor' });
            }
          }

        }
export const ventasDiaController = new VentasDiaController();