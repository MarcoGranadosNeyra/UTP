
package daoImpl;

import conexion.Conexion;
import dao.VentaDAO;
import entidad.Venta;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;


public class VentaDAOImpl implements VentaDAO{

    Conexion oconexion = new Conexion();
        
    @Override
    public List listarVenta() {
        final ArrayList<Venta> lista = new ArrayList<>();
         try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call listarVenta()}")
            ){
            try (ResultSet rs = cs.executeQuery()){
                while (rs.next()) {
                    Venta venta = new Venta();
                    venta.setId(rs.getInt("id"));
                    venta.setUsuario(rs.getString("usuario"));
                    venta.setCliente(rs.getString("cliente"));
                    venta.setStrFecha(rs.getString("fecha"));
                    venta.setHora(rs.getString("hora"));
                    venta.setMonto(rs.getDouble("monto"));
                    lista.add(venta);
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
    public List listarVentaServicio() {
        final ArrayList<Venta> lista = new ArrayList<>();
         try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call listarVentaServicio()}")
            ){
            try (ResultSet rs = cs.executeQuery()){
                while (rs.next()) {
                    Venta venta = new Venta();
                    venta.setId(rs.getInt("id"));
                    venta.setUsuario(rs.getString("usuario"));
                    venta.setCliente(rs.getString("cliente"));
                    venta.setStrFecha(rs.getString("fecha"));
                    venta.setHora(rs.getString("hora"));
                    venta.setMonto(rs.getDouble("monto"));
                    lista.add(venta);
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
    public List listarReporteVentas(Date Fecha1,Date Fecha2) {
        final ArrayList<Venta> lista = new ArrayList<>();
         try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call listarReporteVentas(?,?)}")
            ){
            cs.setDate(1, Fecha1);
            cs.setDate(2, Fecha2);
            try (ResultSet rs = cs.executeQuery()){
                while (rs.next()) {
                    Venta venta = new Venta();
                    venta.setId(rs.getInt("id"));
                    venta.setVendedor(rs.getString("vendedor"));
                    venta.setCliente(rs.getString("cliente"));
                    venta.setMonto(rs.getDouble("monto"));
                    venta.setStrFecha(rs.getString("fecha"));
                    venta.setHora(rs.getString("hora"));
                    lista.add(venta);
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
    public List listarReporteProductosVendidos(Date Fecha1,Date Fecha2) {
        final ArrayList<Venta> lista = new ArrayList<>();
         try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call listarReporteProductosVendidos(?,?)}")
            ){
            cs.setDate(1, Fecha1);
            cs.setDate(2, Fecha2);
            try (ResultSet rs = cs.executeQuery()){
                while (rs.next()) {
                    Venta venta = new Venta();
                    venta.setProducto(rs.getString("producto"));
                    venta.setCantidad(rs.getInt("cantidad"));
                    venta.setMonto(rs.getDouble("monto"));
                    lista.add(venta);
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
    public List listarReporteRepuestosVendidos(Date Fecha1,Date Fecha2) {
        final ArrayList<Venta> lista = new ArrayList<>();
         try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call listarReporteRepuestosVendidos(?,?)}")
            ){
            cs.setDate(1, Fecha1);
            cs.setDate(2, Fecha2);
            try (ResultSet rs = cs.executeQuery()){
                while (rs.next()) {
                    Venta venta = new Venta();
                    venta.setProducto(rs.getString("producto"));
                    venta.setCantidad(rs.getInt("cantidad"));
                    venta.setMonto(rs.getDouble("monto"));
                    lista.add(venta);
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
    public List listarReporteServiciosVendidos(Date Fecha1,Date Fecha2) {
        final ArrayList<Venta> lista = new ArrayList<>();
         try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call listarReporteServiciosVendidos(?,?)}")
            ){
            cs.setDate(1, Fecha1);
            cs.setDate(2, Fecha2);
            try (ResultSet rs = cs.executeQuery()){
                while (rs.next()) {
                    Venta venta = new Venta();
                    venta.setProducto(rs.getString("producto"));
                    venta.setCantidad(rs.getInt("cantidad"));
                    venta.setMonto(rs.getDouble("monto"));
                    lista.add(venta);
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
    public List listarReporteAtencionesTecnico(Date Fecha1,Date Fecha2) {
        final ArrayList<Venta> lista = new ArrayList<>();
         try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call listarAtencionesTecnico(?,?)}")
            ){
            cs.setDate(1, Fecha1);
            cs.setDate(2, Fecha2);
            try (ResultSet rs = cs.executeQuery()){
                while (rs.next()) {
                    Venta venta = new Venta();
                    venta.setCantidad(rs.getInt("cantidad"));
                    venta.setTecnico(rs.getString("tecnico"));
                    venta.setMonto(rs.getDouble("monto"));
                    lista.add(venta);
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
    public Integer agregarVenta(Venta venta) {
        int result=0;
            try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call agregarVenta(?,?)}");
            ){
            cs.setInt(1, venta.getId_usuario());
            cs.setInt(2, venta.getId_cliente());
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
    public boolean actualizarVenta(Venta venta) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public boolean eliminarVenta(int id) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Venta buscarVenta(int id) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

}
