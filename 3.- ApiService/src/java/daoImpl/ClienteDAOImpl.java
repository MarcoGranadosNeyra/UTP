
package daoImpl;

import conexion.Conexion;
import dao.ClienteDAO;
import entidad.Cliente;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;


public class ClienteDAOImpl implements ClienteDAO{

    Conexion oconexion=new Conexion();
       
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
    
}
