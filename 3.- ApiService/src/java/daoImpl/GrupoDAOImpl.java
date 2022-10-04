
package daoImpl;

import conexion.Conexion;
import dao.GrupoDAO;
import entidad.Grupo;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class GrupoDAOImpl implements GrupoDAO {

    Conexion oconexion=new Conexion();
       
    @Override
    public List listarGrupo() {
        final ArrayList<Grupo> lista = new ArrayList<>();
        try (
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call listarGrupo}")
            ){
            try (ResultSet rs = cs.executeQuery()){
                while (rs.next()) {
                        Grupo grupo = new Grupo();
                        grupo.setId(rs.getInt("id"));
                        grupo.setGrupo(rs.getString("grupo"));
                        grupo.setEstado(rs.getBoolean("estado"));
                        lista.add(grupo);
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
    public List listarGrupoByIdUsuario(int id_usuario) {
        final ArrayList<Grupo> lista = new ArrayList<>();
        try (
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call listarGrupoByIdUsuario(?)}")
            ){
             cs.setInt(1, id_usuario);
            try (ResultSet rs = cs.executeQuery()){
                while (rs.next()) {
                        Grupo grupo = new Grupo();
                        grupo.setId(rs.getInt("id"));
                        grupo.setGrupo(rs.getString("grupo"));
                        grupo.setEstado(rs.getBoolean("estado"));
                        lista.add(grupo);
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
