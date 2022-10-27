
package dao;

import entidad.Calendario;
import java.util.List;

public interface CalendarioDAO {
    public List listarCalendario();
    public List listarCalendarioPorProducto(int  id_producto,int id_dia);
    public Calendario buscarCalendario(int  id);
    public Integer agregarCalendario(Calendario calendario);
    public boolean actualizarCalendario(Calendario calendario);

}
