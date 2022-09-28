
package daoImpl;

import conexion.Conexion;
import dao.FormaPagoDAO;
import entidad.FormaPago;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class FormaPagoDAOImpl implements FormaPagoDAO{

    Conexion oconexion = new Conexion();
        
    @Override
    public List listarFormaPago() {
        final ArrayList<FormaPago> lista = new ArrayList<>();
         try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call listarFormaPago()}")
            ){
            try (ResultSet rs = cs.executeQuery()){
                while (rs.next()) {
                    FormaPago formaPago = new FormaPago();
                    formaPago.setId(rs.getInt("id"));
                    formaPago.setFormaPago(rs.getString("forma_pago"));
                    lista.add(formaPago);
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("ERROR : SQL EXCEPTION " +e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("ERROR : EXCEPTION " +e.getMessage());
        }
        return lista;
    }
    
}
