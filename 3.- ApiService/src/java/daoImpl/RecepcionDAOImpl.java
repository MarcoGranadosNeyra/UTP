
package daoImpl;

import conexion.Conexion;
import dao.RecepcionDAO;
import entidad.Recepcion;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class RecepcionDAOImpl implements RecepcionDAO{

    Conexion oconexion=new Conexion();
        
    @Override
    public List listarEquiposRecibidos() {
        final ArrayList<Recepcion> lista = new ArrayList<>();
         try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call listarEquiposRecibidos}")
            ){
            try (ResultSet rs = cs.executeQuery()){
                while (rs.next()) {
                    Recepcion recepcion=new Recepcion();
                    recepcion.setId(rs.getInt("id"));
                    recepcion.setTecnico(rs.getString("tecnico"));
                    recepcion.setCliente(rs.getString("cliente"));
                    recepcion.setEquipo(rs.getString("equipo"));
                    recepcion.setMarca(rs.getString("marca"));
                    recepcion.setModelo(rs.getString("modelo"));
                    recepcion.setSerie(rs.getString("serie"));
                    recepcion.setDescripcion(rs.getString("descripcion"));
                    recepcion.setStrFecha(rs.getString("fecha"));
                    recepcion.setHora(rs.getString("hora"));
                    recepcion.setEntregado(rs.getBoolean("entregado"));
                    recepcion.setEstado(rs.getBoolean("estado"));
                    lista.add(recepcion);
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
    public List listarEquiposEntregados() {
        final ArrayList<Recepcion> lista = new ArrayList<>();
         try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call listarEquiposEntregados}")
            ){
            try (ResultSet rs = cs.executeQuery()){
                while (rs.next()) {
                    Recepcion recepcion=new Recepcion();
                    recepcion.setId(rs.getInt("id"));
                    recepcion.setTecnico(rs.getString("tecnico"));
                    recepcion.setCliente(rs.getString("cliente"));
                    recepcion.setEquipo(rs.getString("equipo"));
                    recepcion.setMarca(rs.getString("marca"));
                    recepcion.setModelo(rs.getString("modelo"));
                    recepcion.setSerie(rs.getString("serie"));
                    recepcion.setDescripcion(rs.getString("descripcion"));
                    recepcion.setStrFecha(rs.getString("fecha"));
                    recepcion.setHora(rs.getString("hora"));
                    recepcion.setEntregado(rs.getBoolean("entregado"));
                    recepcion.setEstado(rs.getBoolean("estado"));
                    lista.add(recepcion);
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
    public Integer agregarRecepcion(Recepcion recepcion) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public boolean actualizarRecepcion(Recepcion recepcion) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public boolean eliminarRecepcion(int id) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Recepcion buscarRecepcion(int id) {
        Recepcion recepcion=null;
        try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call buscarRecepcion(?)}")
            ){
            cs.setInt(1, id);
            try (ResultSet rs = cs.executeQuery()){
                if (rs.next()) {
                    recepcion=new Recepcion();
                    recepcion.setId(rs.getInt("id"));
                    recepcion.setId_usuario(rs.getInt("id_usuario"));
                    recepcion.setId_cliente(rs.getInt("id_cliente"));
                    recepcion.setEquipo(rs.getString("equipo"));
                    recepcion.setMarca(rs.getString("marca"));
                    recepcion.setModelo(rs.getString("modelo"));
                    recepcion.setSerie(rs.getString("serie"));
                    recepcion.setDescripcion(rs.getString("descripcion"));
                    recepcion.setFecha(rs.getDate("fecha"));
                    recepcion.setHora(rs.getString("hora"));
                    recepcion.setEntregado(rs.getBoolean("entregado"));
                    recepcion.setEstado(rs.getBoolean("estado"));
                } else {
                    recepcion=null;
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("ERROR : SQL EXCEPTION " +e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("ERROR : EXCEPTION " +e.getMessage());
        }
        return recepcion;
    }

    @Override
    public boolean finalizarRecepcion(int id) {
        boolean result=false;
        try (
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs=connect.prepareCall("{call finalizarRecepcion(?)}");
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
    
}
