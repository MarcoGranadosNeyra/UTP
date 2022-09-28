package daoImpl;

import conexion.Conexion;
import dao.UsuarioDAO;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import entidad.Usuario;

public class UsuarioDAOImpl implements UsuarioDAO {

    Conexion oconexion = new Conexion();

    @Override
    public List listarUsuario() {
        final ArrayList<Usuario> lista = new ArrayList<>();
        try (
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call listarUsuario}");
            ){
            try(ResultSet rs = cs.executeQuery()){
            while (rs.next()) {
                Usuario usuario = new Usuario();
                usuario.setId(rs.getInt("id"));
                usuario.setId_persona(rs.getInt("id_persona"));
                usuario.setDocumento(rs.getString("documento"));
                usuario.setNro_documento(rs.getString("nro_documento"));
                usuario.setNombre(rs.getString("nombre"));
                usuario.setRol(rs.getString("rol"));
                usuario.setUsuario(rs.getString("usuario"));
                usuario.setEstado(rs.getBoolean("estado"));
                lista.add(usuario);
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
    public Integer agregarUsuario(Usuario usuario) {
        int result=0;
            try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call agregarUsuario(?,?,?,?,?)}");
            ){
            cs.setInt(1, usuario.getId_persona());
            cs.setInt(2, usuario.getId_rol());
            cs.setInt(3, usuario.getId_tipo_usuario());
            cs.setString(4, usuario.getUsuario());
            cs.setString(5, usuario.getPassword());
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
    public Boolean actualizarUsuario(Usuario usuario) {
        boolean result = false;
        try {
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call actualizarUsuario(?,?,?,?,?)}");
            cs.setInt(1, usuario.getId_rol());
            cs.setString(2, usuario.getUsuario());
            cs.setString(3, usuario.getPassword());
            cs.setBoolean(4, usuario.isEstado());
            cs.setInt(5, usuario.getId());
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
    public Boolean eliminarUsuario(int id) {
        boolean result=false;
        try (
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs=connect.prepareCall("{call eliminarUsuario(?)}");
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
    public Usuario buscarUsuarioByIdPersona(int id_usuario) {
        Usuario usuario=null;
        try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs=connect.prepareCall("{call buscarUsuarioByIdPersona(?)}")
            ){
            cs.setInt(1, id_usuario);
                try (ResultSet rs = cs.executeQuery()){
                    if (rs.next()) {
                        usuario = new Usuario();
                        usuario.setId(rs.getInt("id"));
                        usuario.setId_persona(rs.getInt("id_persona"));
                        usuario.setId_rol(rs.getInt("id_rol"));
                        usuario.setUsuario(rs.getString("usuario"));
                        usuario.setEstado(rs.getBoolean("estado"));
                    } else {
                        usuario=null;
                    }
                }
            } catch (SQLException e) {
             throw new RuntimeException("ERROR : SQL EXCEPTION " +e.getMessage());
            } catch (Exception e) {
             throw new RuntimeException("ERROR : EXCEPTION " +e.getMessage());
            }
        return usuario;
    }

    @Override
    public Usuario buscarUsuario(String nombreUsuario) {
        Usuario usuario=null;
        try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs=connect.prepareCall("{call buscarUsuario(?)}")
            ){
            cs.setString(1, nombreUsuario);
                try (ResultSet rs = cs.executeQuery()){
                    if (rs.next()) {
                        usuario = new Usuario();
                        usuario.setId(rs.getInt("id"));
                        usuario.setId_persona(rs.getInt("id_persona"));
                        usuario.setId_rol(rs.getInt("id_rol"));
                        usuario.setUsuario(rs.getString("usuario"));
                        usuario.setPassword(rs.getString("password"));
                    } else {
                        usuario=null;
                    }
                }
            } catch (SQLException e) {
             throw new RuntimeException("ERROR : SQL EXCEPTION " +e.getMessage());
            } catch (Exception e) {
             throw new RuntimeException("ERROR : EXCEPTION " +e.getMessage());
            }
        return usuario;
    }
    

    @Override
    public Usuario validarPassword(String password) {
        Usuario usuario = null;
        try (
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call validarPassword(?)}");
            ){
            cs.setString(1, password);
            try(ResultSet rs = cs.executeQuery()) {
                while(rs.next()) {
                usuario = new Usuario();
                usuario.setId(rs.getInt("id"));
                usuario.setId_persona(rs.getInt("id_persona"));
                usuario.setId_rol(rs.getInt("id_rol"));
                usuario.setUsuario(rs.getString("usuario"));
                usuario.setEstado(rs.getBoolean("estado"));
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("ERROR : SQL EXCEPTION " +e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("ERROR : EXCEPTION " +e.getMessage());
        }
        return usuario;
    }
    
    @Override
    public Usuario validarUsuario(String user, String pass) {
        Usuario usuario = null;
        try (
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call validarUsuarioPassword(?,?)}");
            ){
            cs.setString(1, user);
            cs.setString(2, pass);
            try(ResultSet rs = cs.executeQuery()) {
                while(rs.next()) {
                usuario = new Usuario();
                usuario.setId(rs.getInt("id"));
                usuario.setId_persona(rs.getInt("id_persona"));
                usuario.setId_rol(rs.getInt("id_rol"));
                usuario.setUsuario(rs.getString("usuario"));
                usuario.setEstado(rs.getBoolean("estado"));
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("ERROR : SQL EXCEPTION " +e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("ERROR : EXCEPTION " +e.getMessage());
        }
        return usuario;
    }

    @Override
    public Usuario buscarUsuario(int id) {
        Usuario usuario=null;
        try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs=connect.prepareCall("{call buscarUsuario(?)}")
            ){
            cs.setInt(1, id);
                try (ResultSet rs = cs.executeQuery()){
                    if (rs.next()) {
                        usuario = new Usuario();
                        usuario.setId(rs.getInt("id"));
                        usuario.setId_persona(rs.getInt("id_persona"));
                        usuario.setId_rol(rs.getInt("id_rol"));
                        usuario.setUsuario(rs.getString("usuario"));
                        usuario.setPassword(rs.getString("password"));
                        usuario.setEstado(rs.getBoolean("estado"));
                    } else {
                        usuario=null;
                    }
                }
            } catch (SQLException e) {
             throw new RuntimeException("ERROR : SQL EXCEPTION " +e.getMessage());
            } catch (Exception e) {
             throw new RuntimeException("ERROR : EXCEPTION " +e.getMessage());
            }
        return usuario;
    }


    
}
