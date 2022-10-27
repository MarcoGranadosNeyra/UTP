
package daoImpl;

import conexion.Conexion;
import dao.HoraDAO;
import entidad.Hora;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class HoraDAOImpl implements HoraDAO {
    Conexion oconexion=new Conexion();
    @Override
    public List listarHora() {
        final ArrayList<Hora> lista = new ArrayList<>();
         try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call listarHora}")
            ){
            try (ResultSet rs = cs.executeQuery()){
                while (rs.next()) {
                    Hora hora=new Hora();
                    hora.setId(rs.getInt("id"));
                    hora.setHora(rs.getString("hora"));
                    lista.add(hora);
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
