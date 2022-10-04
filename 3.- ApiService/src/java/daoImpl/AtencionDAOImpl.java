/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package daoImpl;

import conexion.Conexion;
import dao.AtencionDAO;
import entidad.Atencion;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 *
 * @author Marco Grandos - Granados IC
 */
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
    
}
