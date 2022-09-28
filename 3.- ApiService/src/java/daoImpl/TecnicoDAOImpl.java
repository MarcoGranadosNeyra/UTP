
package daoImpl;

import conexion.Conexion;
import dao.TecnicoDAO;
import entidad.Tecnico;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Usuario
 */
public class TecnicoDAOImpl implements TecnicoDAO{

    Conexion oconexion = new Conexion();
    
    @Override
    public Tecnico buscarTecnico(int id) {
        Tecnico tecnico=null;
        try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs=connect.prepareCall("{call buscarTecnico(?)}")
            ){
            cs.setInt(1, id);
                try (ResultSet rs = cs.executeQuery()){
                    if (rs.next()) {
                        tecnico = new Tecnico();
                        tecnico.setId(rs.getInt("id"));
                        tecnico.setId_especialidad(rs.getInt("id_especialidad"));
                        tecnico.setId_persona(rs.getInt("id_persona"));
                        tecnico.setEspecialidad(rs.getString("especialidad"));
                        tecnico.setEstado(rs.getBoolean("estado"));
                    } else {
                        tecnico=null;
                    }
                }
            } catch (SQLException e) {
             throw new RuntimeException("ERROR : SQL EXCEPTION " +e.getMessage());
            } catch (Exception e) {
             throw new RuntimeException("ERROR : EXCEPTION " +e.getMessage());
            }
        return tecnico;
    }

    @Override
    public Tecnico buscarTecnicoByIdPersona(int id_persona) {
        Tecnico tecnico=null;
        try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs=connect.prepareCall("{call buscarTecnicoByIdPersona(?)}")
            ){
            cs.setInt(1, id_persona);
                try (ResultSet rs = cs.executeQuery()){
                    if (rs.next()) {
                        tecnico = new Tecnico();
                        tecnico.setId(rs.getInt("id"));
                        tecnico.setId_especialidad(rs.getInt("id_especialidad"));
                        tecnico.setId_persona(rs.getInt("id_persona"));
                        tecnico.setEspecialidad(rs.getString("especialidad"));
                        tecnico.setEstado(rs.getBoolean("estado"));
                    } else {
                        tecnico=null;
                    }
                }
            } catch (SQLException e) {
             throw new RuntimeException("ERROR : SQL EXCEPTION " +e.getMessage());
            } catch (Exception e) {
             throw new RuntimeException("ERROR : EXCEPTION " +e.getMessage());
            }
        return tecnico;
    }

    @Override
    public List listarTecnico() {
        final ArrayList<Tecnico> lista = new ArrayList<>();
         try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call listarTecnico}");
            ){
             try (ResultSet rs = cs.executeQuery()){
                while (rs.next()) {
                        Tecnico  tecnico= new Tecnico();
                        tecnico.setId(rs.getInt("id"));
                        tecnico.setDocumento(rs.getString("documento"));
                        tecnico.setNro_documento(rs.getString("nro_documento"));
                        tecnico.setNombre(rs.getString("nombre"));
                        tecnico.setEspecialidad(rs.getString("especialidad"));
                        tecnico.setEstado(rs.getBoolean("estado"));
                        lista.add(tecnico);
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
    public Integer agregarTecnico(Tecnico tecnico) {
        int result=0;
            try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call agregarTecnico(?,?,?)}");
            ){
            cs.setInt(1, tecnico.getId_especialidad());
            cs.setInt(2, tecnico.getId_persona());
            cs.setString(3, tecnico.getEspecialidad());
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
    public Boolean eliminarTecnico(int id) {
        boolean result=false;
        try (
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs=connect.prepareCall("{call eliminarTecnico(?)}");
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
    public Boolean actualizarTecnico(Tecnico tecnico) {
        boolean result = false;
        try {
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call actualizarTecnico(?,?,?,?,?)}");
            cs.setInt(1, tecnico.getId_especialidad());
            cs.setInt(2, tecnico.getId_persona());
            cs.setString(3, tecnico.getEspecialidad());
            cs.setBoolean(4, tecnico.isEstado());
            cs.setInt(5, tecnico.getId());
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
    public List listarCitasPendientesTecnico(int id_tecnico) {
        final ArrayList<Tecnico> lista = new ArrayList<>();
         try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call listarCitasPendientesTecnico(?)}");
            ){
             cs.setInt(1, id_tecnico);
             try (ResultSet rs = cs.executeQuery()){
                while (rs.next()) {
                        Tecnico  tecnico= new Tecnico();
                        tecnico.setId(rs.getInt("id"));
                        tecnico.setNombre(rs.getString("nombres"));
                        tecnico.setDocumento(rs.getString("documento"));
                        tecnico.setNro_documento(rs.getString("nro_documento"));
                        tecnico.setDireccion(rs.getString("direccion"));
                        tecnico.setTelefono(rs.getString("telefono"));
                        tecnico.setFecha(rs.getString("fecha"));
                        tecnico.setHora(rs.getString("hora"));
                        lista.add(tecnico);
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
    public List listarReporteCitasAtendidasTecnico(int id_tecnico, Date fecha1, Date fecha2) {
        final ArrayList<Tecnico> lista = new ArrayList<>();
         try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call listarReporteCitasAtendidasTecnico(?,?,?)}");
            ){
             cs.setInt(1, id_tecnico);
             cs.setDate(2, fecha1);
             cs.setDate(3, fecha2);
             try (ResultSet rs = cs.executeQuery()){
                while (rs.next()) {
                        Tecnico  tecnico= new Tecnico();
                        tecnico.setId(rs.getInt("id"));
                        tecnico.setCliente(rs.getString("cliente"));
                        tecnico.setDocumento(rs.getString("documento"));
                        tecnico.setNro_documento(rs.getString("nro_documento"));
                        tecnico.setTelefono(rs.getString("telefono"));
                        tecnico.setFecha(rs.getString("fecha"));
                        tecnico.setHora(rs.getString("hora"));
                        tecnico.setMonto_repuestos(rs.getDouble("monto_repuestos"));
                        tecnico.setMonto_servicios(rs.getDouble("monto_servicios"));
                        lista.add(tecnico);
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
