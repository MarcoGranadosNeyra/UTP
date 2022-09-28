
package daoImpl;

import conexion.Conexion;
import dao.ModuloDAO;
import entidad.Modulo;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;


public class ModuloDAOImpl implements ModuloDAO{

    Conexion oconexion = new Conexion();
    
    @Override
    public List listarModulo() {
        final ArrayList<Modulo> lista = new ArrayList<>();
        try (
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call listarModulo}")
            ){
            try (ResultSet rs = cs.executeQuery()){
                while (rs.next()) {
                        Modulo modulo = new Modulo();
                        modulo.setId(rs.getInt("id"));
                        modulo.setModulo(rs.getString("modulo"));
                        modulo.setUrl(rs.getString("url"));
                        modulo.setEstado(rs.getBoolean("estado"));
                        lista.add(modulo);
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("ERROR : SQL EXCEPTION " +e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("ERROR : EXCEPTION " +e.getMessage());
        }
        return lista;
    }
    
}
