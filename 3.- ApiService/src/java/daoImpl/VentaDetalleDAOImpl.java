/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package daoImpl;

import conexion.Conexion;
import dao.VentaDetalleDAO;
import entidad.VentaDetalle;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;

/**
 *
 * @author Marco Grandos - Granados IC
 */
public class VentaDetalleDAOImpl implements VentaDetalleDAO{
        Conexion oconexion = new Conexion();

    @Override
    public Boolean agregarDetalleVenta(VentaDetalle detalleVenta) {
        boolean result=false;
            try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call agregarDetalleVenta(?,?,?,?)}");
            ){
            cs.setInt(1, detalleVenta.getId_venta());
            cs.setInt(2, detalleVenta.getId_producto());
            cs.setInt(3, detalleVenta.getCantidad());
            cs.setDouble(4, detalleVenta.getPrecio());
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
