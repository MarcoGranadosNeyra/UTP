package daoImpl;

import conexion.Conexion;
import dao.CotizacionDetalleDAO;
import entidad.Cotizacion;
import entidad.CotizacionDetalle;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class CotizacionDetalleDAOImpl implements CotizacionDetalleDAO{
    Conexion oconexion = new Conexion();

     @Override
    public List listarDetalleCotizacion(int id_cotizacion) {
        final ArrayList<CotizacionDetalle> lista = new ArrayList<>();
         try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call listarDetalleCotizacion(?)}")
            ){
             cs.setInt(1, id_cotizacion);
            try (ResultSet rs = cs.executeQuery()){
                while (rs.next()) {
                    CotizacionDetalle detalle=new CotizacionDetalle();
                    detalle.setId_cotizacion(rs.getInt("id_cotizacion"));
                    detalle.setId_producto(rs.getInt("id_producto"));
                    detalle.setCantidad(rs.getInt("cantidad"));
                    detalle.setPrecio(rs.getDouble("precio"));
                    lista.add(detalle);
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
    public Boolean agregarDetalleCotizacion(CotizacionDetalle detalle) {
        boolean result=false;
            try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call agregarDetalleCotizacion(?,?,?,?)}");
            ){
            cs.setInt(1, detalle.getId_cotizacion());
            cs.setInt(2, detalle.getId_producto());
            cs.setInt(3, detalle.getCantidad());
            cs.setDouble(4, detalle.getPrecio());
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


}
