
package daoImpl;

import conexion.Conexion;
import dao.ProvinciaDAO;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import entidad.Provincia;

public class ProvinciaDAOImpl implements ProvinciaDAO {

    Conexion oconexion=new Conexion();

    @Override
    public List<Provincia> listarProvincia(String id_departamento) {
        final ArrayList<Provincia> lista = new ArrayList<>();
         try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call listarProvincia(?)}")
            ){
             cs.setString(1, id_departamento);
             try (ResultSet rs = cs.executeQuery()){
                while (rs.next()) {
                    Provincia provincia=new Provincia();
                    provincia.setId(rs.getString("id"));
                    provincia.setProvincia(rs.getString("provincia"));
                    lista.add(provincia);
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
    public String agregarProvincia(Provincia oprovincia) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public String actualizarProvincia(Provincia oprovincia) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public String eliminarProvincia(String idProvincia) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Provincia buscarProvincia(String id_provincia) {
        Provincia provincia=null;
        try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs=connect.prepareCall("{call buscarProvincia(?)}")
            ){
            cs.setString(1, id_provincia);
                try (ResultSet rs = cs.executeQuery()){
                    if (rs.next()) {
                        provincia = new Provincia();
                        provincia.setId(rs.getString("id"));
                        provincia.setProvincia(rs.getString("provincia"));
                        provincia.setId_departamento(rs.getString("id_departamento"));
                    } else {
                        provincia=null;
                    }
                }
            } catch (SQLException e) {
             throw new RuntimeException("ERROR : SQL EXCEPTION " +e.getMessage());
            } catch (Exception e) {
             throw new RuntimeException("ERROR : EXCEPTION " +e.getMessage());
            }
        return provincia;
    }
    
    @Override
    public Provincia buscarProvinciaPorNombre(String nombre_provincia) {
        Provincia provincia=null;
        try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call buscarProvinciaPorNombre(?)}")
            ){
            cs.setString(1, nombre_provincia);
            try (ResultSet rs = cs.executeQuery()){
                if (rs.next()) {
                    provincia = new Provincia();
                    provincia.setId(rs.getString("id"));
                    provincia.setProvincia(rs.getString("provincia"));
                    provincia.setId_departamento(rs.getString("id_departamento"));
                } else {
                    provincia=null;
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("ERROR : SQL EXCEPTION " +e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("ERROR : EXCEPTION " +e.getMessage());
        }
        return provincia;
    }
    
}
