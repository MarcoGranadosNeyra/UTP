
package daoImpl;

import conexion.Conexion;
import dao.DocumentoDAO;
import entidad.Documento;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Usuario
 */
public class DocumentoDAOImpl implements DocumentoDAO {

    Conexion oconexion = new Conexion();
    
    @Override
    public List listarDocumento() {
        final ArrayList<Documento> lista = new ArrayList<>();
        try (
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call listarDocumento}")
            ){
            try (ResultSet rs = cs.executeQuery()){
                while (rs.next()) {
                        Documento documento = new Documento();
                        documento.setId(rs.getInt("id"));
                        documento.setDocumento(rs.getString("documento"));
                        lista.add(documento);
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("ERROR : SQL EXCEPTION " +e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("ERROR : EXCEPTION " +e.getMessage());
        }
        return lista;
    }
    
    @Override
    public Documento buscarDocumento(int id) {
        Documento documento=null;
        try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs=connect.prepareCall("{call buscarDocumento(?)}")
            ){
            cs.setInt(1, id);
                try (ResultSet rs = cs.executeQuery()){
                    if (rs.next()) {
                        documento = new Documento();
                        documento.setId(rs.getInt("id"));
                        documento.setDocumento(rs.getString("documento"));
                    } else {
                        documento=null;
                    }
                }
            } catch (SQLException e) {
             throw new RuntimeException("ERROR : SQL EXCEPTION " +e.getMessage());
            } catch (Exception e) {
             throw new RuntimeException("ERROR : EXCEPTION " +e.getMessage());
            }
        return documento;
    }
}
