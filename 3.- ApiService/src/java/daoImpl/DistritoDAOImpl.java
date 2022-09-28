
package daoImpl;

import conexion.Conexion;
import dao.DistritoDAO;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import entidad.Distrito;

public class DistritoDAOImpl implements DistritoDAO {

    Conexion oconexion=new Conexion();

    @Override
    public List<Distrito> listarDistrito(String idProvincia) {
        final ArrayList<Distrito> lista = new ArrayList<>();
         try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call listarDistrito(?)}")
            ){
             cs.setString(1, idProvincia);
             try (ResultSet rs = cs.executeQuery()){
                while (rs.next()) {
                    Distrito distrito = new Distrito();
                    distrito.setId(rs.getString("id"));
                    distrito.setDistrito(rs.getString("distrito"));
                    distrito.setId_provincia(rs.getString("id_provincia"));
                    distrito.setId_departamento(rs.getString("id_departamento"));
                    lista.add(distrito);
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
    public String agregarDistrito(Distrito odistrito) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public String actualizarDistrito(Distrito odistrito) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public String eliminarDistrito(String idDistrito) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Distrito buscarDistrito(String id_distrito) {
        Distrito distrito=null;
        try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call buscarDistrito(?)}")
            ){
            cs.setString(1, id_distrito);
            try (ResultSet rs = cs.executeQuery()){
                if (rs.next()) {
                    distrito = new Distrito();
                    distrito.setId(rs.getString("id"));
                    distrito.setDistrito(rs.getString("distrito"));
                    distrito.setId_provincia(rs.getString("id_provincia"));
                    distrito.setId_departamento(rs.getString("id_departamento"));
                } else {
                    distrito=null;
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("ERROR : SQL EXCEPTION " +e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("ERROR : EXCEPTION " +e.getMessage());
        }
        return distrito;
    }
    
    @Override
    public Distrito buscarDistritoPorNombre(String nombre_distrito) {
        Distrito distrito=null;
        try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call buscarDistritoPorNombre(?)}")
            ){
            cs.setString(1, nombre_distrito);
            try (ResultSet rs = cs.executeQuery()){
                if (rs.next()) {
                    distrito = new Distrito();
                    distrito.setId(rs.getString("id"));
                    distrito.setDistrito(rs.getString("distrito"));
                    distrito.setId_provincia(rs.getString("id_provincia"));
                    distrito.setId_departamento(rs.getString("id_departamento"));
                } else {
                    distrito=null;
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("ERROR : SQL EXCEPTION " +e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("ERROR : EXCEPTION " +e.getMessage());
        }
        return distrito;
    }
    
}
