
package dao;

import entidad.Recepcion;
import java.util.List;

public interface RecepcionDAO {
    public List listarEquiposRecibidos();
    public List listarEquiposEntregados();
    public Integer agregarRecepcion(Recepcion recepcion);
    public boolean actualizarRecepcion(Recepcion recepcion);
    public boolean eliminarRecepcion(int id);
    public boolean finalizarRecepcion(int id);
    public Recepcion buscarRecepcion(int id);
}
