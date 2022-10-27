
package daoImpl;

import conexion.Conexion;
import dao.CotizacionDAO;
import entidad.Cotizacion;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class CotizacionDAOImpl implements CotizacionDAO{

    Conexion oconexion=new Conexion();
    
    @Override
    public List listarCotizacionesPendientes() {
        final ArrayList<Cotizacion> lista = new ArrayList<>();
         try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call listarCotizacionesPendientes}")
            ){
            try (ResultSet rs = cs.executeQuery()){
                while (rs.next()) {
                    Cotizacion cotizacion=new Cotizacion();
                    cotizacion.setId(rs.getInt("id"));
                    cotizacion.setTecnico(rs.getString("tecnico"));
                    cotizacion.setCliente(rs.getString("cliente"));
                    cotizacion.setStrfecha(rs.getString("fecha"));
                    cotizacion.setHora(rs.getString("hora"));
                    cotizacion.setStrEstado(rs.getString("estado"));
                    lista.add(cotizacion);
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
    public List listarCotizacionesAprobadas() {
        final ArrayList<Cotizacion> lista = new ArrayList<>();
         try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call listarCotizacionesAprobadas}")
            ){
            try (ResultSet rs = cs.executeQuery()){
                while (rs.next()) {
                    Cotizacion cotizacion=new Cotizacion();
                    cotizacion.setId(rs.getInt("id"));
                    cotizacion.setTecnico(rs.getString("tecnico"));
                    cotizacion.setCliente(rs.getString("cliente"));
                    cotizacion.setStrfecha(rs.getString("fecha"));
                    cotizacion.setHora(rs.getString("hora"));
                    cotizacion.setStrEstado(rs.getString("estado"));
                    lista.add(cotizacion);
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
    public Integer agregarCotizacion(Cotizacion cotizacion) {
        int result=0;
            try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call agregarCotizacion(?,?)}");
            ){
            cs.setInt(1, cotizacion.getId_usuario());
            cs.setInt(2, cotizacion.getId_cliente());
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
    public boolean actualizarCotizacion(Cotizacion cotizacion) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
    @Override
    public boolean eliminarCotizacion(int id) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public boolean aprobarCotizacion(int id) {
        boolean result=false;
        try (
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs=connect.prepareCall("{call aprobarCotizacion(?)}");
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
    public Cotizacion buscarCotizacion(int id) {
        Cotizacion cotizacion=null;
        try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call buscarCotizacion(?)}")
            ){
            cs.setInt(1, id);
            try (ResultSet rs = cs.executeQuery()){
                if (rs.next()) {
                    cotizacion=new Cotizacion();
                    cotizacion.setId(rs.getInt("id"));
                    cotizacion.setId_usuario(rs.getInt("id_usuario"));
                    cotizacion.setId_cliente(rs.getInt("id_cliente"));
                    cotizacion.setId_empresa(rs.getInt("id_empresa"));
                    cotizacion.setFecha(rs.getDate("fecha"));
                    cotizacion.setHora(rs.getString("hora"));
                    cotizacion.setEstado(rs.getBoolean("estado"));
                } else {
                    cotizacion=null;
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("ERROR : SQL EXCEPTION " +e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("ERROR : EXCEPTION " +e.getMessage());
        }
        return cotizacion;
    }



    
}
