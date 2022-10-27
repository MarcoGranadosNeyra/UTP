
package dao;

import entidad.Producto;
import java.util.List;


public interface ProductoDAO {
    public List<Producto> listarProducto();
    public List<Producto> listarRepuesto();
    public List<Producto> listarServicio();
    public List<Producto> listarRepuestoServicio();
    public Integer agregarProducto(Producto producto);
    public Integer agregarRepuesto(Producto producto);
    public Integer agregarServicio(Producto producto);
    public boolean actualizarProducto(Producto producto);
    public boolean actualizarServicio(Producto producto);
    public boolean actualizarRepuesto(Producto producto);
    public boolean eliminarProducto(int id);
    public boolean eliminarServicio(int id);
    public boolean eliminarRepuesto(int id);
    public Producto buscarProducto(int id);
    public Producto buscarServicio(int id);
    public Producto buscarRepuesto(int id);
}
