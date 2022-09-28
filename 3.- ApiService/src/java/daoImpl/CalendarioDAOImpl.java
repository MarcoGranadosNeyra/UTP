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
    public List listarCalendario(int id_especialidad, int id_dia) {
        final ArrayList<Calendario> lista = new ArrayList<>();
        try (
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call listarCalendarioPorEspecialidad(?,?)}")
            ){
            cs.setInt(1, id_especialidad);
            cs.setInt(2, id_dia);
            try (ResultSet rs = cs.executeQuery()){
                while (rs.next()) {
                        Calendario calendario = new Calendario();
                        calendario.setId(rs.getInt("id"));
                        calendario.setEspecialidad(rs.getString("especialidad"));
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
            CallableStatement cs=connect.prepareCall("{call listarCalendarioById(?)}")
            ){
            cs.setInt(1, id);
                try (ResultSet rs = cs.executeQuery()){
                    if (rs.next()) {
                        calendario = new Calendario();
                        calendario.setId(rs.getInt("id"));
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
    
}
