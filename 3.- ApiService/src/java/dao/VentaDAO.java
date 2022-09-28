
package dao;

import entidad.Venta;
import java.util.List;

public interface VentaDAO {
    public List listarVenta();
    public Integer agregarVenta(Venta venta);
    public boolean actualizarVenta(Venta venta);
    public boolean eliminarVenta(int id);
    public Venta buscarVenta(int id);
}
