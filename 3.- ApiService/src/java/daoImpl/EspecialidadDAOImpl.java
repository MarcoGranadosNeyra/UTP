
package daoImpl;

import conexion.Conexion;
import dao.EspecialidadDAO;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import entidad.Especialidad;

public class EspecialidadDAOImpl implements EspecialidadDAO {

    Conexion oconexion = new Conexion();
    
    @Override
    public List listarEspecialidad() {
        final ArrayList<Especialidad> lista = new ArrayList<>();
        try (
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call listarEspecialidad}")
            ){
            try (ResultSet rs = cs.executeQuery()){
                while (rs.next()) {
                        Especialidad especialidad = new Especialidad();
                        especialidad.setId(rs.getInt("id"));
                        especialidad.setEspecialidad(rs.getString("especialidad"));
                        especialidad.setDescripcion(rs.getString("descripcion"));
                        especialidad.setImagen(rs.getString("imagen"));
                        especialidad.setActivo(rs.getBoolean("activo"));
                        especialidad.setPrecio(rs.getDouble("precio"));
                        lista.add(especialidad);
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
    public List listarEspecialidad(String nombreEspecialidad) {
        final ArrayList<Especialidad> lista = new ArrayList<>();
        try (
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call listarEspecialidad}");
            ){
            try (ResultSet rs = cs.executeQuery()){
                while (rs.next()) {
                    if (rs.getString("especialidad").contains(nombreEspecialidad)) {
                        Especialidad especialidad = new Especialidad();
                        especialidad.setId(rs.getInt("id"));
                        especialidad.setEspecialidad(rs.getString("especialidad"));
                        especialidad.setDescripcion(rs.getString("descripcion"));
                        especialidad.setImagen(rs.getString("imagen"));
                        especialidad.setActivo(rs.getBoolean("activo"));
                        lista.add(especialidad);
                    }
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
    public String agregarEspecialidad(Especialidad especialidad) {
        String  result="";
            try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call agregarEspecialidad(?,?,?)}");
            ){
            cs.setString(1, especialidad.getEspecialidad().toUpperCase());
            cs.setString(2, especialidad.getDescripcion());
            cs.setString(3, especialidad.getImagen());
            cs.executeUpdate();
            result = "Registro Agregado";
            cs.close();
        } catch (SQLException e) {
             result="Error : "+e.getMessage();
        } catch (Exception e) {
            result="Error : "+e.getMessage();
        } 
        return result;
    }

    @Override
    public String actualizarEspecialidad(Especialidad especialidad) {
        String  result="";
            try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call actualizarEspecialidad(?,?,?,?)}");
            ){
            cs.setString(1, especialidad.getEspecialidad());
            cs.setString(2, especialidad.getDescripcion());
            cs.setString(3, especialidad.getImagen());
            cs.setInt(4, especialidad.getId());
            cs.executeUpdate();
            cs.close();
            result="Registro Actualizado";
        } catch (SQLException e) {
             result="Error : "+e.getMessage();
        } catch (Exception e) {
           result="Error : "+e.getMessage();
        } 
        return result;
    }

    @Override
    public Boolean eliminarEspecialidad(int id) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Especialidad buscarEspecialidad(int id) {
        Especialidad  especialidad=null;
        try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call buscarEspecialidad(?)}")
            ){
            cs.setInt(1, id);
            try (ResultSet rs = cs.executeQuery()){
                if (rs.next()) {
                    especialidad = new Especialidad();
                    especialidad.setId(rs.getInt("id"));
                    especialidad.setEspecialidad(rs.getString("especialidad"));
                    especialidad.setDescripcion(rs.getString("descripcion"));
                    especialidad.setImagen(rs.getString("imagen"));
                    especialidad.setActivo(rs.getBoolean("activo"));
                } else {
                    especialidad=null;
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("ERROR : SQL EXCEPTION " +e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("ERROR : EXCEPTION " +e.getMessage());
        }
        return especialidad;
    }
    
    @Override
    public Especialidad buscarEspecialidad(String _especialidad) {
        Especialidad  especialidad=null;
        try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call buscarEspecialidad(?)}")
            ){
            cs.setString(1, _especialidad);
            try (ResultSet rs = cs.executeQuery()){
                if (rs.next()) {
                    especialidad = new Especialidad();
                    especialidad.setId(rs.getInt("id"));
                    especialidad.setEspecialidad(rs.getString("especialidad"));
                    especialidad.setDescripcion(rs.getString("descripcion"));
                    especialidad.setImagen(rs.getString("imagen"));
                    especialidad.setActivo(rs.getBoolean("activo"));
                } else {
                    especialidad=null;
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("ERROR : SQL EXCEPTION " +e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("ERROR : EXCEPTION " +e.getMessage());
        }
        return especialidad;
    }
    
    
}
