package api.utp.res;

import daoImpl.CalendarioDAOImpl;
import entidad.Calendario;
import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;

import javax.ws.rs.POST;
import javax.ws.rs.Path;

/**
 * REST Web Service
 *
 */
@Path("calendario")
public class CalendarioResource {

    @Context
    private UriInfo context;

    public CalendarioResource() {
    }
    
    CalendarioDAOImpl calendarioDAO = new CalendarioDAOImpl();
    List<Calendario> listarCalendario= new ArrayList<Calendario>();

    @POST
    @Path("listarCalendarioPorProducto")
    @Produces("application/json")
    @Consumes("application/json")
    public List<Calendario> listarCalendarioPorProducto(Calendario calendario) {
        
        listarCalendario=calendarioDAO.listarCalendarioPorProducto(calendario.getId_producto(), calendario.getId_dia());
        return listarCalendario;
    }    

}
