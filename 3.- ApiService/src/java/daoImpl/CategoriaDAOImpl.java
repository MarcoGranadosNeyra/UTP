
package daoImpl;

import conexion.Conexion;
import dao.CategoriaDAO;
import entidad.Categoria;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class CategoriaDAOImpl implements CategoriaDAO {

   Conexion oconexion=new Conexion();
        
    @Override
    public List<Categoria> listarCategoria() {
        final ArrayList<Categoria> lista = new ArrayList<>();
         try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call listarCategoria}")
            ){
            try (ResultSet rs = cs.executeQuery()){
                while (rs.next()) {
                    Categoria categoria=new Categoria();
                    categoria.setId(rs.getInt("id"));
                    categoria.setCategoria(rs.getString("categoria"));
                    categoria.setImagen(rs.getString("imagen"));
                    categoria.setEstado(rs.getBoolean("estado"));
                    lista.add(categoria);
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
    public Integer agregarCategoria(Categoria categoria) {
        int result=0;
            try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call agregarCategoria(?,?)}");
            ){
            cs.setString(1, categoria.getCategoria());
            cs.setString(2, categoria.getImagen());
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
    public boolean actualizarCategoria(Categoria categoria) {
        boolean result = false;
        try {
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call actualizarCategoria(?,?,?,?)}");
            cs.setString(1, categoria.getCategoria());
            cs.setString(2, categoria.getImagen());
            cs.setBoolean(3, categoria.getEstado());
            cs.setInt(4, categoria.getId());
            cs.executeUpdate();
            result = true;
            cs.close();
        } catch (SQLException e) {
            throw new RuntimeException(e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
        return result;
    }

    @Override
    public boolean eliminarCategoria(int id) {
        boolean result=false;
        try (
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs=connect.prepareCall("{call eliminarCategoria(?)}");
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

    @Override
    public Categoria buscarCategoria(int id) {
        Categoria categoria=null;
        try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call buscarCategoria(?)}")
            ){
            cs.setInt(1, id);
            try (ResultSet rs = cs.executeQuery()){
                if (rs.next()) {
                    categoria=new Categoria();
                    categoria.setId(rs.getInt("id"));
                    categoria.setCategoria(rs.getString("categoria"));
                    categoria.setEstado(rs.getBoolean("estado"));
                } else {
                    categoria=null;
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("ERROR : SQL EXCEPTION " +e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("ERROR : EXCEPTION " +e.getMessage());
        }
        return categoria;
    }
    
}
