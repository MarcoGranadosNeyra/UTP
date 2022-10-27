
package dao;

import entidad.Atencion;
import java.util.List;


public interface AtencionDAO {
  public List listarAtencionesPendientes(int  id_tecnico);
  public List listarAtencionesFinalizadas(int  id_tecnico);
  public Integer agregarAtencion(Atencion atencion);
  public boolean finalizarAtencion(int id);
}
