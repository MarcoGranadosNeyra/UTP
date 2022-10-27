
package dao;

import entidad.CotizacionDetalle;
import java.util.List;

public interface CotizacionDetalleDAO {
   public List listarDetalleCotizacion(int id_cotizacion);
   public Boolean agregarDetalleCotizacion(CotizacionDetalle detalle);
}
