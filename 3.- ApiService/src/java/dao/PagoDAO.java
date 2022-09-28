
package dao;

import entidad.Pago;

public interface PagoDAO {

    public Integer agregarPago(Pago pago);
    public Boolean eliminarPago(int id);


}
