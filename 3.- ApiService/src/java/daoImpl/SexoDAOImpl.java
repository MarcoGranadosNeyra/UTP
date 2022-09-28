/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package daoImpl;

import conexion.Conexion;
import dao.SexoDAO;
import entidad.Sexo;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class SexoDAOImpl implements SexoDAO{

    Conexion oconexion = new Conexion();

    @Override
    public List listarSexo() {
        final ArrayList<Sexo> lista = new ArrayList<>();
         try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call listarSexo()}")
            ){
            try (ResultSet rs = cs.executeQuery()){
                while (rs.next()) {
                    Sexo sexo = new Sexo();
                    sexo.setId(rs.getInt("id"));
                    sexo.setSexo(rs.getString("sexo"));
                    lista.add(sexo);
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
    public Boolean agregarSexo(Sexo sexo) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Boolean actualizarSexo(Sexo sexo) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Boolean eliminarSexo(int id) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Sexo buscarSexo(int id_sexo) {
        Sexo sexo=null;
        try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call buscarSexo(?)}")
            ){
            cs.setInt(1, id_sexo);
            try (ResultSet rs = cs.executeQuery()){
                if (rs.next()) {
                    sexo=new Sexo();
                    sexo.setId(rs.getInt("id"));
                    sexo.setSexo(rs.getString("sexo"));
                } else {
                    sexo=null;
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("ERROR : SQL EXCEPTION " +e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("ERROR : EXCEPTION " +e.getMessage());
        }
        return sexo;
    }

    @Override
    public Sexo buscarSexo(String nombreSexo) {
        Sexo sexo=null;
        try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call buscarSexoPorNombre(?)}")
            ){
            cs.setString(1, nombreSexo);
            try (ResultSet rs = cs.executeQuery()){
                if (rs.next()) {
                    sexo=new Sexo();
                    sexo.setId(rs.getInt("id"));
                    sexo.setSexo(rs.getString("sexo"));
                } else {
                    sexo=null;
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("ERROR : SQL EXCEPTION " +e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("ERROR : EXCEPTION " +e.getMessage());
        }
        return sexo;
    }
    
}
