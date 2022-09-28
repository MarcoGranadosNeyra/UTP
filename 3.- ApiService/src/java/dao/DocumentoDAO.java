
package dao;

import entidad.Documento;
import java.util.List;

public interface DocumentoDAO {
    public List listarDocumento();
    public Documento buscarDocumento(int id);
}
