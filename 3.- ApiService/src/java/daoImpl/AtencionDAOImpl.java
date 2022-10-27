package daoImpl;

import conexion.Conexion;
import dao.AtencionDAO;
import entidad.Atencion;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class AtencionDAOImpl implements AtencionDAO{
    
    Conexion oconexion = new Conexion();
    
    @Override
    public Integer agregarAtencion(Atencion atencion) {
        int result=0;
            try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call agregarAtencion(?,?,?,?)}");
            ){
            cs.setInt(1, atencion.getId_venta());
            cs.setInt(2, atencion.getId_calendario());
            cs.setDate(3, atencion.getFecha());
            cs.setString(4, atencion.getHora());
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
    public List listarAtencionesPendientes(int id_tecnico) {
        final ArrayList<Atencion> lista = new ArrayList<>();
         try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call listarAtenciones(?)}")
            ){
            cs.setInt(1, id_tecnico);
            try (ResultSet rs = cs.executeQuery()){
                while (rs.next()) {
                    Atencion atencion=new Atencion();
                    atencion.setId(rs.getInt("id"));
                    atencion.setProducto(rs.getString("producto"));
                    atencion.setPrecio(rs.getDouble("precio"));
                    atencion.setCliente(rs.getString("cliente"));
                    atencion.setStrfecha(rs.getString("fecha"));
                    atencion.setHora(rs.getString("hora"));
                    atencion.setAtencion(rs.getString("atencion"));
                    lista.add(atencion);
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
    public List listarAtencionesFinalizadas(int id_tecnico) {
        final ArrayList<Atencion> lista = new ArrayList<>();
         try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call listarAtencionesFinalizadas(?)}")
            ){
            cs.setInt(1, id_tecnico);
            try (ResultSet rs = cs.executeQuery()){
                while (rs.next()) {
                    Atencion atencion=new Atencion();
                    atencion.setId(rs.getInt("id"));
                    atencion.setProducto(rs.getString("producto"));
                    atencion.setPrecio(rs.getDouble("precio"));
                    atencion.setCliente(rs.getString("cliente"));
                    atencion.setStrfecha(rs.getString("fecha"));
                    atencion.setHora(rs.getString("hora"));
                    atencion.setAtencion(rs.getString("atencion"));
                    lista.add(atencion);
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
    public boolean finalizarAtencion(int id) {
        boolean result=false;
        try (
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs=connect.prepareCall("{call finalizarAtencion(?)}");
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
