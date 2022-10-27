
package daoImpl;

import conexion.Conexion;
import dao.ClienteDAO;
import entidad.Cliente;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;


public class ClienteDAOImpl implements ClienteDAO{

    Conexion oconexion=new Conexion();
       
    @Override
    public List listarCliente() {
        final ArrayList<Cliente> lista = new ArrayList<>();
         try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call listarCliente}")
            ){
            try (ResultSet rs = cs.executeQuery()){
                while (rs.next()) {
                    Cliente cliente = new Cliente();
                    cliente.setId(rs.getInt("id"));
                    cliente.setId_persona(rs.getInt("id_persona"));
                    cliente.setDocumento(rs.getString("documento"));
                    cliente.setNro_documento(rs.getString("nro_documento"));
                    cliente.setNombre(rs.getString("nombre"));
                    cliente.setTelefono(rs.getString("telefono"));
                    cliente.setDireccion(rs.getString("direccion"));
                    cliente.setEstado(rs.getBoolean("estado"));
                    lista.add(cliente);
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
    public Cliente buscarCliente(int id) {
        Cliente cliente=null;
        try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs=connect.prepareCall("{call buscarCliente(?)}")
            ){
            cs.setInt(1, id);
                try (ResultSet rs = cs.executeQuery()){
                    if (rs.next()) {
                        cliente = new Cliente();
                        cliente.setId(rs.getInt("id"));
                        cliente.setId_persona(rs.getInt("id_persona"));
                        cliente.setEstado(rs.getBoolean("estado"));
                    } else {
                        cliente=null;
                    }
                }
            } catch (SQLException e) {
             throw new RuntimeException("ERROR : SQL EXCEPTION " +e.getMessage());
            } catch (Exception e) {
             throw new RuntimeException("ERROR : EXCEPTION " +e.getMessage());
            }
        return cliente;
    }
    
    @Override
    public Cliente buscarCliente(int id_documento, String nro_documento) {
        Cliente cliente=null;
        try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call buscarCliente(?,?)}");
            ){
            cs.setInt(1, id_documento);
            cs.setString(2, nro_documento);
            try (ResultSet rs=cs.executeQuery()){
                if (rs.next()) {
                    cliente=new Cliente();
                    cliente.setId(rs.getInt("id"));
                    cliente.setId_documento(rs.getInt("id_documento"));
                    cliente.setNro_documento(rs.getString("nro_documento"));
                    cliente.setNombre(rs.getString("nombre"));
                    cliente.setApaterno(rs.getString("apaterno"));
                    cliente.setAmaterno(rs.getString("amaterno"));
                    cliente.setTelefono(rs.getString("telefono"));
                    cliente.setDireccion(rs.getString("direccion"));
                } else {
                    cliente=null;
                }
                rs.close();
                cs.close();
            }
        } catch (SQLException e) {
            throw new RuntimeException("ERROR : SQL EXCEPTION " +e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("ERROR : EXCEPTION " +e.getMessage());
        }
        return cliente;
    }


    @Override
    public Cliente buscarClientePorIdPersona(int id) {
        Cliente cliente=null;
        try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs=connect.prepareCall("{call buscarClienteByIdPersona(?)}")
            ){
            cs.setInt(1, id);
                try (ResultSet rs = cs.executeQuery()){
                    if (rs.next()) {
                        cliente = new Cliente();
                        cliente.setId(rs.getInt("id"));
                        cliente.setId_persona(rs.getInt("id_persona"));
                        cliente.setEstado(rs.getBoolean("estado"));
                    } else {
                        cliente=null;
                    }
                }
            } catch (SQLException e) {
             throw new RuntimeException("ERROR : SQL EXCEPTION " +e.getMessage());
            } catch (Exception e) {
             throw new RuntimeException("ERROR : EXCEPTION " +e.getMessage());
            }
        return cliente;
    }

    @Override
    public Integer agregarCliente(Cliente cliente) {
        int result=0;
            try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call agregarCliente(?)}");
            ){
            cs.setInt(1, cliente.getId_persona());
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
    public Boolean actualizarCliente(Cliente cliente) {
        boolean result = false;
        try {
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call actualizarCliente(?,?,?)}");
            cs.setInt(1, cliente.getId_persona());
            cs.setBoolean(2, cliente.isEstado());
            cs.setInt(3, cliente.getId());
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
    public Boolean eliminarCliente(int id) {
        boolean result=false;
        try (
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs=connect.prepareCall("{call eliminarCliente(?)}");
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


}
