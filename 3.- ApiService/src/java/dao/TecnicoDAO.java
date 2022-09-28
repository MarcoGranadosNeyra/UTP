package dao;

import entidad.Tecnico;
import java.sql.Date;
import java.util.List;

public interface TecnicoDAO {
    public List listarTecnico();
    public List listarCitasPendientesTecnico(int id_tecnico);
    public List listarReporteCitasAtendidasTecnico(int id_tecnico,Date fecha1,Date fecha2);
    public Integer agregarTecnico(Tecnico tecnico);
    public Boolean actualizarTecnico(Tecnico tecnico);
    public Tecnico buscarTecnico(int id);
    public Tecnico buscarTecnicoByIdPersona(int id_persona);
    public Boolean eliminarTecnico(int id);
}
