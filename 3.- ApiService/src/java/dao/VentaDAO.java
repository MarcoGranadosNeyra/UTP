
package dao;

import entidad.Venta;
import java.sql.Date;
import java.util.List;

public interface VentaDAO {
    public List listarVenta();
    public List listarVentaServicio();
    public List listarReporteVentas(Date fecha1,Date fecha2);
    public List listarReporteProductosVendidos(Date fecha1,Date fecha2);
    public List listarReporteRepuestosVendidos(Date fecha1,Date fecha2);
    public List listarReporteServiciosVendidos(Date fecha1,Date fecha2);
    public List listarReporteAtencionesTecnico(Date fecha1,Date fecha2);
    public Integer agregarVenta(Venta venta);
    public boolean actualizarVenta(Venta venta);
    public boolean eliminarVenta(int id);
    public Venta buscarVenta(int id);
}
