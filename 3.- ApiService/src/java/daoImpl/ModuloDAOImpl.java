
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

    @Override
    public Integer agregarModulo(Modulo modulo) {
        int result=0;
            try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call agregarModulo(?,?)}");
            ){
            cs.setString(1, modulo.getModulo());
            cs.setString(2, modulo.getUrl());
            cs.executeUpdate();
            
            try (ResultSet last_inserted = cs.getResultSet()){;
                if(last_inserted.next()) {
                   result = last_inserted.getInt(1);
                }
            }
            cs.close();
        } catch (SQLException e) {
             throw new RuntimeException(e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        } 
        return result;
    }

    @Override
    public boolean actualizarModulo(Modulo modulo) {
        boolean result = false;
        try {
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call actualizarModulo(?,?,?,?)}");
            cs.setString(1, modulo.getModulo());
            cs.setString(2, modulo.getUrl());
            cs.setBoolean(3, modulo.getEstado());
            cs.setInt(4, modulo.getId());
            cs.executeUpdate();
            result = true;
            cs.close();
        } catch (SQLException e) {
            throw new RuntimeException(e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
        return result;
    }

    @Override
    public boolean eliminarModulo(int id) {
        boolean result=false;
        try (
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs=connect.prepareCall("{call eliminarModulo(?)}");
            ){
            cs.setInt(1, id);
            cs.executeUpdate();
            cs.close();
           result=true;
        } catch (SQLException e) {
             throw new RuntimeException(e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        } 
        return result;
    }

    @Override
    public Modulo buscarModulo(int id) {
        Modulo modulo=null;
        try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call buscarModulo(?)}")
            ){
            cs.setInt(1, id);
            try (ResultSet rs = cs.executeQuery()){
                if (rs.next()) {
                    modulo=new Modulo();
                    modulo.setId(rs.getInt("id"));
                    modulo.setModulo(rs.getString("modulo"));
                    modulo.setUrl(rs.getString("url"));
                    modulo.setEstado(rs.getBoolean("estado"));
                } else {
                    modulo=null;
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("ERROR : SQL EXCEPTION " +e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("ERROR : EXCEPTION " +e.getMessage());
        }
        return modulo;
    }
    
}
