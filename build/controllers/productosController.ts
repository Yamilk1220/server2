import { Request,Response } from "express";
import pool from '../database';
class ProductosController
{
    public async crearProducto(req: Request, res: Response): Promise<void> {
        console.log(req.body);
        try {
          const resp = await pool.query(
            "INSERT INTO productos (CodigoBarras, Nombre, Tipo, Marca, Precio, Cantidad) VALUES (?, ?, ?, ?, ?, ?)",
            [req.body.CodigoBarras, req.body.Nombre, req.body.Tipo, req.body.Marca, req.body.Precio, req.body.Cantidad]
          );
      
          if (resp.affectedRows > 0) {
            res.status(200).json({ 'mensaje': 'Producto creado exitosamente' });
          } else {
            res.status(402).json({ 'mensaje': 'No se pudo crear el producto' });
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ 'mensaje': 'Error interno del servidor' });
        }
      }
      
    
    public async mostrarProducto(req: Request, res: Response ): Promise<void>{
        console.log("Todo bien xd");
        const respuesta = await pool.query('SELECT * FROM productos');
        res.json( respuesta );
        }
        
    public async EliminarProducto(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query('DELETE FROM productos WHERE CodigoBarras = ?', [id]);

        if (resp.affectedRows > 0) {
            res.json({ mensaje: 'Producto eliminado correctamente' });
            return;
        }
        res.status(401).json({ mensaje: 'Producto no encontrado hermano' });
        }

        public async BuscarName(req: Request, res: Response): Promise<void> {
            console.log("YA ESTAMOS AQUI");
            try {
                const { nombre } = req.params;
                const respuesta = await pool.query('SELECT * FROM productos WHERE CodigoBarras = ?', [nombre]);
                res.json(respuesta);
            } catch (error) {
                console.error('Error al ejecutar la consulta:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        }
        
        public async restarCantidad(req: Request, res: Response): Promise<void> {
            try {
              const { codigoBarras, cantidadRestar } = req.body; // Asegúrate de enviar estos datos en el cuerpo de la solicitud
          
              // Consulta para restar la cantidad
              const respuesta = await pool.query(
                'UPDATE productos SET cantidad = cantidad - ? WHERE CodigoBarras = ?',
                [cantidadRestar, codigoBarras]
              );
          
              res.json({ mensaje: `Cantidad restada correctamente para el CodigoBarras: ${codigoBarras}` });
            } catch (error) {
              console.error('Error al restar cantidad por CodigoBarras:', error);
              res.status(500).json({ error: 'Error interno del servidor' });
            }
          }
          
}
        

export const productosController = new ProductosController();