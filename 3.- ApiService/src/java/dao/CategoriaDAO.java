
package dao;

import entidad.Categoria;
import java.util.List;

public interface CategoriaDAO {
    public List listarCategoria();
    public Integer agregarCategoria(Categoria categoria);
    public boolean actualizarCategoria(Categoria categoria);
    public boolean eliminarCategoria(int id);
    public Categoria buscarCategoria(int id);
}
