
package dao;

import entidad.Cotizacion;
import java.util.List;

public interface CotizacionDAO {
    public List listarCotizacionesPendientes();
    public List listarCotizacionesAprobadas();
    public Integer agregarCotizacion(Cotizacion cotizacion);
    public boolean actualizarCotizacion(Cotizacion cotizacion);
    public boolean eliminarCotizacion(int id);
    public boolean aprobarCotizacion(int id);
    public Cotizacion buscarCotizacion(int id);
}
