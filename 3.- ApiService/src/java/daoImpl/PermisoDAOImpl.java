
package daoImpl;

import conexion.Conexion;
import dao.PermisoDAO;

import entidad.Permiso;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class PermisoDAOImpl implements PermisoDAO{
    
    Conexion oconexion = new Conexion();
    
    @Override
    public List listarPermiso(int id_usuario) {
        final ArrayList<Permiso> lista = new ArrayList<>();
        try (
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call listarPermiso(?)}")
            ){
            cs.setInt(1, id_usuario);
            try (ResultSet rs = cs.executeQuery()){
                while (rs.next()) {
                        Permiso permiso = new Permiso();
                        permiso.setId(rs.getInt("id"));
                        permiso.setModulo(rs.getString("modulo"));
                        permiso.setUrl(rs.getString("url"));
                        lista.add(permiso);
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
    public List listarPermiso() {
        final ArrayList<Permiso> lista = new ArrayList<>();
        try (
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call listarPermisos()}")
            ){
            
            try (ResultSet rs = cs.executeQuery()){
                while (rs.next()) {
                        Permiso permiso = new Permiso();
                        permiso.setId(rs.getInt("id"));
                        permiso.setRol(rs.getString("rol"));
                        permiso.setModulo(rs.getString("modulo"));
                        permiso.setUrl(rs.getString("url"));
                        lista.add(permiso);
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
