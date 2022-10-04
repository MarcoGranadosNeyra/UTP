
package dao;

import entidad.Calendario;
import java.util.List;

public interface CalendarioDAO {
    public List listarCalendarioPorProducto(int  id_producto,int id_dia);
    public Calendario buscarCalendario(int  id);

}
