
package dao;


import entidad.Modulo;
import java.util.List;

public interface ModuloDAO {
    public List listarModulo();
    public Integer agregarModulo(Modulo modulo);
    public boolean actualizarModulo(Modulo modulo);
    public boolean eliminarModulo(int id);
    public Modulo buscarModulo(int id);

}
