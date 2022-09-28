/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package daoImpl;

import conexion.Conexion;
import dao.DepartamentoDAO;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import entidad.Departamento;

public class DepartamentoDAOImpl implements DepartamentoDAO {

    Conexion oconexion=new Conexion();
    
    @Override
    public List<Departamento> listarDepartamento() {
        final ArrayList<Departamento> lista = new ArrayList<>();
         try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call listarDepartamento}")
            ){
            try (ResultSet rs = cs.executeQuery()){
                while (rs.next()) {
                    Departamento departamento=new Departamento();
                    departamento.setId(rs.getString("id"));
                    departamento.setDepartamento(rs.getString("departamento"));
                    lista.add(departamento);
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
    public String agregarDepartamento(Departamento odepartamento) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public String actualizarDepartamento(Departamento odepartamento) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public String eliminarDepartamento(String idDepartamento) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Departamento buscarDepartamento(String id_departamento) {
        Departamento departamento=null;
        try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call buscarDepartamento(?)}")
            ){
            cs.setString(1, id_departamento);
            try (ResultSet rs = cs.executeQuery()){
                if (rs.next()) {
                    departamento = new Departamento();
                    departamento.setId(rs.getString("id"));
                    departamento.setDepartamento(rs.getString("departamento"));
                } else {
                    departamento=null;
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("ERROR : SQL EXCEPTION " +e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("ERROR : EXCEPTION " +e.getMessage());
        }
        return departamento;
    }
    
        @Override
    public Departamento buscarDepartamentoPorNombre(String nombre_departamento) {
        Departamento departamento=null;
        try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call buscarDepartamentoPorNombre(?)}")
            ){
            cs.setString(1, nombre_departamento);
            try (ResultSet rs = cs.executeQuery()){
                if (rs.next()) {
                    departamento = new Departamento();
                    departamento.setId(rs.getString("id"));
                    departamento.setDepartamento(rs.getString("departamento"));
                } else {
                    departamento=null;
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("ERROR : SQL EXCEPTION " +e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("ERROR : EXCEPTION " +e.getMessage());
        }
        return departamento;
    }
    
}
