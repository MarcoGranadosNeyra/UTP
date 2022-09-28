
package dao;

import java.util.List;
import entidad.Sexo;

public interface SexoDAO {
    public List listarSexo();
    public Boolean agregarSexo(Sexo sexo);
    public Boolean actualizarSexo(Sexo sexo);
    public Boolean eliminarSexo(int id);
    public Sexo buscarSexo(int id);
    public Sexo buscarSexo(String sexo);

}
