
package dao;

import entidad.Permiso;
import java.util.List;

public interface PermisoDAO {
    public List listarPermiso();
    public List listarPermiso(int  id_usuario);
    public Integer agregarPermiso(Permiso permiso);
    public Boolean actualizarPermiso(Permiso permiso);
    public Boolean eliminarPermiso(int id);
    public Permiso buscarPermiso(int id);
}
