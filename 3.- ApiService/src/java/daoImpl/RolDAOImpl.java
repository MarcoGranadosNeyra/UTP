/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package daoImpl;

import conexion.Conexion;
import dao.RolDAO;
import entidad.Rol;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Usuario
 */
public class RolDAOImpl implements RolDAO{
    
    Conexion oconexion = new Conexion();
    
    @Override
    public Rol buscarRol(int id) {
        Rol rol=null;
        try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs=connect.prepareCall("{call buscarRol(?)}")
            ){
            cs.setInt(1, id);
                try (ResultSet rs = cs.executeQuery()){
                    if (rs.next()) {
                        rol = new Rol();
                        rol.setId(rs.getInt("id"));
                        rol.setRol(rs.getString("rol"));
                    } else {
                        rol=null;
                    }
                }
            } catch (SQLException e) {
             throw new RuntimeException("ERROR : SQL EXCEPTION " +e.getMessage());
            } catch (Exception e) {
             throw new RuntimeException("ERROR : EXCEPTION " +e.getMessage());
            }
        return rol;
    }

    @Override
    public List listarRol() {
        final ArrayList<Rol> lista = new ArrayList<>();
         try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call listarRol}");
            ){
             try (ResultSet rs = cs.executeQuery()){
                while (rs.next()) {
                        Rol  rol= new Rol();
                        rol.setId(rs.getInt("id"));
                        rol.setRol(rs.getString("rol"));
                        lista.add(rol);
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
