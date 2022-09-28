
package dao;

import entidad.Calendario;
import java.util.List;

public interface CalendarioDAO {
    public List listarCalendario(int  id_especialidad,int id_dia);
    public Calendario buscarCalendario(int  id);

}
