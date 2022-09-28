
package dao;

import java.util.List;
import entidad.Distrito;

/**
 *
 * @author Marco
 */
public interface DistritoDAO {
    public List<Distrito> listarDistrito(String idProvincia);
    public String agregarDistrito(Distrito distrito);
    public String actualizarDistrito(Distrito distrito);
    public String eliminarDistrito(String idDistrito);
    public Distrito buscarDistrito(String idDistrito);
    public Distrito buscarDistritoPorNombre(String nombre_distrito);
}