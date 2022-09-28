
package daoImpl;

import conexion.Conexion;
import dao.PagoDAO;
import entidad.Pago;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

public class PagoDAOImpl implements PagoDAO{

    Conexion oconexion = new Conexion();
        
    @Override
    public Integer agregarPago(Pago pago) {
        int result=0;
            try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call agregarPago(?,?,?)}");
            ){
            cs.setInt(1, pago.getId_venta());
            cs.setInt(2, pago.getId_forma_pago());
            cs.setDouble(3, pago.getMonto());
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
    public Boolean eliminarPago(int id) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
}
