/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package daoImpl;

import conexion.Conexion;
import dao.CalendarioDAO;
import entidad.Calendario;
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
public class CalendarioDAOImpl implements CalendarioDAO{

    Conexion oconexion = new Conexion();
    
    @Override
    public List listarCalendarioPorProducto(int id_producto, int id_dia) {
        final ArrayList<Calendario> lista = new ArrayList<>();
        try (
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call listarCalendarioPorProducto(?,?)}")
            ){
            cs.setInt(1, id_producto);
            cs.setInt(2, id_dia);
            try (ResultSet rs = cs.executeQuery()){
                while (rs.next()) {
                        Calendario calendario = new Calendario();
                        calendario.setId(rs.getInt("id"));
                        calendario.setProducto(rs.getString("producto"));
                        calendario.setTecnico(rs.getString("tecnico"));
                        calendario.setFoto(rs.getString("foto"));
                        calendario.setDia(rs.getString("dia"));
                        calendario.setHora(rs.getString("hora"));
                        lista.add(calendario);
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
    public Calendario buscarCalendario(int id) {
        Calendario calendario=null;
        try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs=connect.prepareCall("{call buscarCalendario(?)}")
            ){
            cs.setInt(1, id);
                try (ResultSet rs = cs.executeQuery()){
                    if (rs.next()) {
                        calendario = new Calendario();
                        calendario.setId(rs.getInt("id"));
                        calendario.setId_producto(rs.getInt("id_producto"));
                        calendario.setId_tecnico(rs.getInt("id_tecnico"));
                        calendario.setId_dia(rs.getInt("id_dia"));
                        calendario.setId_hora(rs.getInt("id_hora"));
                        calendario.setLibre(rs.getBoolean("libre"));
                        calendario.setEstado(rs.getBoolean("estado"));
                    } else {
                        calendario=null;
                    }
                }
            } catch (SQLException e) {
             throw new RuntimeException("ERROR : SQL EXCEPTION " +e.getMessage());
            } catch (Exception e) {
             throw new RuntimeException("ERROR : EXCEPTION " +e.getMessage());
            }
        return calendario;
    }

    @Override
    public List listarCalendario() {
        final ArrayList<Calendario> lista = new ArrayList<>();
        try (
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call listarCalendario}")
            ){
            try (ResultSet rs = cs.executeQuery()){
                while (rs.next()) {
                        Calendario calendario = new Calendario();
                        calendario.setId(rs.getInt("id"));
                        calendario.setProducto(rs.getString("producto"));
                        calendario.setTecnico(rs.getString("tecnico"));
                        calendario.setDia(rs.getString("dia"));
                        calendario.setHora(rs.getString("hora"));
                        calendario.setLibre(rs.getBoolean("libre"));
                        calendario.setEstado(rs.getBoolean("estado"));
                        lista.add(calendario);
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
    public Integer agregarCalendario(Calendario calendario) {
          int result=0;
            try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call agregarCalendario(?,?,?,?)}");
            ){
            cs.setInt(1, calendario.getId_producto());
            cs.setInt(2, calendario.getId_tecnico());
            cs.setInt(3, calendario.getId_dia());
            cs.setInt(4, calendario.getId_hora());
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
    public boolean actualizarCalendario(Calendario calendario) {
        boolean result = false;
        try {
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call actualizarCalendario(?,?,?,?,?,?)}");
            cs.setInt(1, calendario.getId_producto());
            cs.setInt(2, calendario.getId_tecnico());
            cs.setInt(3, calendario.getId_dia());
            cs.setInt(4, calendario.getId_hora());
            cs.setBoolean(5, calendario.isEstado() );
            cs.setInt(6, calendario.getId());
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
    
}
