
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
                        permiso.setId_grupo(rs.getInt("id_grupo"));
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
            CallableStatement cs = connect.prepareCall("{call listarPermiso()}")
            ){
            
            try (ResultSet rs = cs.executeQuery()){
                while (rs.next()) {
                        Permiso permiso = new Permiso();
                        permiso.setId(rs.getInt("id"));
                        permiso.setGrupo(rs.getString("grupo"));
                        permiso.setRol(rs.getString("rol"));
                        permiso.setModulo(rs.getString("modulo"));
                        permiso.setOrden(rs.getInt("orden"));
                        permiso.setEstado(rs.getBoolean("estado"));
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
    public Integer agregarPermiso(Permiso permiso) {
        int result=0;
            try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call agregarPermiso(?,?,?,?)}");
            ){
            cs.setInt(1, permiso.getId_grupo());
            cs.setInt(2, permiso.getId_rol());
            cs.setInt(3, permiso.getId_modulo());
            cs.setInt(4, permiso.getOrden());
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
    public Boolean actualizarPermiso(Permiso permiso) {
        boolean result = false;
        try {
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call actualizarPermiso(?,?,?,?,?,?)}");
            cs.setInt(1, permiso.getId_grupo());
            cs.setInt(2, permiso.getId_rol());
            cs.setInt(3, permiso.getId_modulo());
            cs.setInt(4, permiso.getOrden());
            cs.setBoolean(5, permiso.getEstado());
            cs.setInt(6, permiso.getId());
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
    public Boolean eliminarPermiso(int id) {
        boolean result=false;
        try (
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs=connect.prepareCall("{call eliminarPermiso(?)}");
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
    public Permiso buscarPermiso(int id) {
        Permiso permiso=null;
        try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call buscarPermiso(?)}")
            ){
            cs.setInt(1, id);
            try (ResultSet rs = cs.executeQuery()){
                if (rs.next()) {
                    permiso=new Permiso();
                    permiso.setId(rs.getInt("id"));
                    permiso.setId_grupo(rs.getInt("id_grupo"));
                    permiso.setId_rol(rs.getInt("id_rol"));
                    permiso.setId_modulo(rs.getInt("id_modulo"));
                    permiso.setOrden(rs.getInt("orden"));
                    permiso.setEstado(rs.getBoolean("estado"));
                } else {
                    permiso=null;
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("ERROR : SQL EXCEPTION " +e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("ERROR : EXCEPTION " +e.getMessage());
        }
        return permiso;
    }
    
}
