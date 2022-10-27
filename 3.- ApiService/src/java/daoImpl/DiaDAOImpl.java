
package daoImpl;

import conexion.Conexion;
import dao.DiaDAO;
import entidad.Departamento;
import entidad.Dia;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class DiaDAOImpl implements DiaDAO {
    Conexion oconexion=new Conexion();
    @Override
    public List listarDia() {
        final ArrayList<Dia> lista = new ArrayList<>();
         try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call listarDia}")
            ){
            try (ResultSet rs = cs.executeQuery()){
                while (rs.next()) {
                    Dia dia=new Dia();
                    dia.setId(rs.getInt("id"));
                    dia.setDia(rs.getString("dia"));
                    lista.add(dia);
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
