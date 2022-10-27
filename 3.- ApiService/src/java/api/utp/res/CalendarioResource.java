package api.utp.res;

import daoImpl.CalendarioDAOImpl;
import daoImpl.DiaDAOImpl;
import daoImpl.HoraDAOImpl;
import entidad.Calendario;
import entidad.Dia;
import entidad.Hora;
import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.json.simple.JSONObject;

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

    DiaDAOImpl diaDAO = new DiaDAOImpl();
    List<Dia> listarDia= new ArrayList<Dia>();
    
    HoraDAOImpl horaDAO = new HoraDAOImpl();
    List<Hora> listarHora= new ArrayList<Hora>();
    
    CalendarioDAOImpl calendarioDAO = new CalendarioDAOImpl();
    List<Calendario> listarCalendario= new ArrayList<Calendario>();
    
    @GET
    @Path("dia/list")
    @Produces("application/json")
    public List<Dia> listarDia() {
        
        listarDia=diaDAO.listarDia();
        return listarDia;
    }
    
    @GET
    @Path("hora/list")
    @Produces("application/json")
    public List<Hora> listarHora() {
        
        listarHora=horaDAO.listarHora();
        return listarHora;
    }  
    
    @GET
    @Path("list")
    @Produces("application/json")
    public List<Calendario> listarCalendario() {
        
        listarCalendario=calendarioDAO.listarCalendario();
        return listarCalendario;
    }  
    
    @GET
    @Path("/buscar/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Calendario buscarCalendario(@PathParam(value = "id") int id) {
        Calendario calendario = calendarioDAO.buscarCalendario(id);
        return calendario;
    }

    @POST
    @Path("listarCalendarioPorProducto")
    @Produces("application/json")
    @Consumes("application/json")
    public List<Calendario> listarCalendarioPorProducto(Calendario calendario) {
        
        listarCalendario=calendarioDAO.listarCalendarioPorProducto(calendario.getId_producto(), calendario.getId_dia());
        return listarCalendario;
    }
    
    @POST
    @Path("agregar")
    @Produces("application/json")
    @Consumes("application/json")
    public Response agregarCliente(Calendario calendario) {
        int result = 0;
        String mensaje = "";
        
        try {
            if (calendarioDAO.agregarCalendario(calendario)>0) {
                result = 1;
                mensaje = "Registro agregado";
            }
        } catch (Exception e) {
            result = 0;
            mensaje = "Error : "+e;
            
        }

        JSONObject json = new JSONObject();
      
        json.put("result", result);
        json.put("mensaje", mensaje);

        return Response
            .status(200)
            .header("Access-Control-Allow-Origin", "*")
            .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
            .header("Access-Control-Allow-Credentials", "true")
            .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
            .header("Access-Control-Max-Age", "1209600")
            .entity(json.toString())
            .build();
    }
    

    @POST
    @Path("actualizar")
    @Produces("application/json")
    @Consumes("application/json")
    public Response actualizarCalendario(Calendario calendario) {

        int result = 0;
        String mensaje = "";
        JSONObject json = new JSONObject();
        try {

            if (calendarioDAO.actualizarCalendario(calendario)) {
                result = 1;
                mensaje = "Registro actualizado";
            }

        } catch (Exception e) {
            mensaje = e.getMessage();
        }

        json.put("result", result);
        json.put("mensaje", mensaje);

        return Response
                .status(200)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
                .header("Access-Control-Allow-Credentials", "true")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
                .header("Access-Control-Max-Age", "1209600")
                .entity(json.toString())
                .build();

    }    

}
