
package dao;

import java.util.List;
import entidad.Especialidad;

public interface EspecialidadDAO {
    public List listarEspecialidad();
    public List listarEspecialidad(String especialidad);
    public String agregarEspecialidad(Especialidad especialidad);
    public String actualizarEspecialidad(Especialidad especialidad);
    public Boolean eliminarEspecialidad(int id);
    public Especialidad buscarEspecialidad(int id);
    public Especialidad buscarEspecialidad(String especialidad);
}
