
package daoImpl;

import conexion.Conexion;
import dao.PersonaDAO;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import entidad.Persona;
import java.sql.SQLException;

public class PersonaDAOImpl implements PersonaDAO{

    Conexion oconexion = new Conexion();
    
    @Override
    public List listarPersona(String filtro) {
        final ArrayList<Persona> lista = new ArrayList<>();
         try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call listarpersona}");
            ){
             try (ResultSet rs = cs.executeQuery()){
                while (rs.next()) {
                    if(rs.getString("nro_documento").contains(filtro) || 
                       rs.getString("nombres").contains(filtro)){
                        Persona persona = new Persona();
                        persona.setId(rs.getInt("id"));
                        persona.setDocumento(rs.getString("documento"));
                        persona.setNro_documento(rs.getString("nro_documento"));
                        persona.setNombres(rs.getString("nombres"));
                        lista.add(persona);
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
    public Integer agregarPersona(Persona persona) {
        int result=0;
            try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call agregarPersona(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}");
            ){
            cs.setString(1, persona.getId_departamento());
            cs.setString(2, persona.getId_provincia());
            cs.setString(3, persona.getId_distrito());
            cs.setInt(4, persona.getId_documento());
            cs.setString(5, persona.getNro_documento());
            cs.setString(6, persona.getNombre());
            cs.setString(7, persona.getApaterno());
            cs.setString(8, persona.getAmaterno());
            cs.setString(9, persona.getTelefono());
            cs.setString(10, persona.getDireccion());
            cs.setDate(11, persona.getFecha_naci());
            cs.setInt(12, persona.getId_sexo());
            cs.setString(13, persona.getCorreo());
            cs.setString(14, persona.getFirma());
            cs.setString(15, persona.getHuella());
            cs.setString(16, persona.getFoto());
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
    public Boolean actualizarPersona(Persona persona) {
        boolean result=false;
            try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs=connect.prepareCall("{call actualizarPersona(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}");
            ){
            cs.setInt(1, persona.getId_documento());
            cs.setString(2, persona.getId_departamento());
            cs.setString(3, persona.getId_provincia());
            cs.setString(4, persona.getId_distrito());
            cs.setString(5, persona.getNro_documento());
            cs.setString(6, persona.getNombre());
            cs.setString(7, persona.getApaterno());
            cs.setString(8, persona.getAmaterno());
            cs.setString(9, persona.getTelefono());
            cs.setString(10, persona.getDireccion());
            cs.setDate(11, persona.getFecha_naci());
            cs.setInt(12, persona.getId_sexo());
            cs.setString(13, persona.getCorreo());
            cs.setString(14, persona.getFirma());
            cs.setString(15, persona.getHuella());
            cs.setString(16, persona.getFoto());
            cs.setInt(17, persona.getId());
            cs.executeUpdate();
            result=true;
            cs.close();
        } catch (SQLException e) {
             throw new RuntimeException(e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        } 
        return result;
    }

    @Override
    public Boolean eliminarPersona(int id) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Persona buscarPersona(int id) {
        Persona persona=null;
        try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call listarPersonaById(?)}");
            ){
            cs.setInt(1, id);
            try (ResultSet rs=cs.executeQuery()){
                if (rs.next()) {
                    persona=new Persona();
                    persona.setId(rs.getInt("id"));
                    persona.setId_departamento(rs.getString("id_departamento"));
                    persona.setId_provincia(rs.getString("id_provincia"));
                    persona.setId_distrito(rs.getString("id_distrito"));
                    persona.setId_documento(rs.getInt("id_documento"));
                    persona.setNro_documento(rs.getString("nro_documento"));
                    persona.setNombre(rs.getString("nombre"));
                    persona.setApaterno(rs.getString("apaterno"));
                    persona.setAmaterno(rs.getString("amaterno"));
                    persona.setTelefono(rs.getString("telefono"));
                    persona.setDireccion(rs.getString("direccion"));
                    persona.setFecha_naci(rs.getDate("fecha_naci"));
                    persona.setId_sexo(rs.getInt("id_sexo"));
                    persona.setCorreo(rs.getString("correo"));
                    persona.setFirma(rs.getString("firma"));
                    persona.setHuella(rs.getString("huella"));
                    persona.setFoto(rs.getString("foto"));
                } else {
                    persona=null;
                }
                rs.close();
                cs.close();
            }
        } catch (SQLException e) {
            throw new RuntimeException("ERROR : SQL EXCEPTION " +e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("ERROR : EXCEPTION " +e.getMessage());
        }
        return persona;
    }

    @Override
    public Persona buscarPersona(int id_documento, String nro_documento) {
        Persona persona=null;
        try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call buscarPersona(?,?)}");
            ){
            cs.setInt(1, id_documento);
            cs.setString(2, nro_documento);
            try (ResultSet rs=cs.executeQuery()){
                if (rs.next()) {
                    persona=new Persona();
                    persona.setId(rs.getInt("id"));
                    persona.setId_departamento(rs.getString("id_departamento"));
                    persona.setId_provincia(rs.getString("id_provincia"));
                    persona.setId_distrito(rs.getString("id_distrito"));
                    persona.setId_documento(rs.getInt("id_documento"));
                    persona.setNro_documento(rs.getString("nro_documento"));
                    persona.setNombre(rs.getString("nombre"));
                    persona.setApaterno(rs.getString("apaterno"));
                    persona.setAmaterno(rs.getString("amaterno"));
                    persona.setTelefono(rs.getString("telefono"));
                    persona.setDireccion(rs.getString("direccion"));
                    persona.setFecha_naci(rs.getDate("fecha_naci"));
                    persona.setId_sexo(rs.getInt("id_sexo"));
                    persona.setCorreo(rs.getString("correo"));
                    persona.setFirma(rs.getString("firma"));
                    persona.setHuella(rs.getString("huella"));
                    persona.setFoto(rs.getString("foto"));
                } else {
                    persona=null;
                }
                rs.close();
                cs.close();
            }
        } catch (SQLException e) {
            throw new RuntimeException("ERROR : SQL EXCEPTION " +e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("ERROR : EXCEPTION " +e.getMessage());
        }
        return persona;
    }
}
