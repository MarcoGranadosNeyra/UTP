package api.utp.res;

import daoImpl.EspecialidadDAOImpl;
import daoImpl.TecnicoDAOImpl;
import entidad.Especialidad;
import entidad.Tecnico;
import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import org.json.simple.JSONObject;
import javax.ws.rs.core.Response;
import reporte.Reporte;

/**
 * REST Web Service
 *
 */
@Path("tecnico")
public class TecnicoResource {

    @Context
    private UriInfo context;

    public TecnicoResource() {
    }
    
    EspecialidadDAOImpl especialidadDAO = new EspecialidadDAOImpl();
    List<Especialidad> listarEspecialidad = new ArrayList<>();

    TecnicoDAOImpl tecnicoDAO = new TecnicoDAOImpl();
    List<Tecnico> listarTecnico = new ArrayList<>();


    @GET
    @Path("especialidad")
    @Produces("application/json")
    public List<Especialidad> ListarEspecialidad() {
         listarEspecialidad = especialidadDAO.listarEspecialidad();
         return listarEspecialidad;
    }
    
    @GET
    @Path("list")
    @Produces("application/json")
    public List<Tecnico> ListarTecnico() {
         listarTecnico = tecnicoDAO.listarTecnico();
         return listarTecnico;
    }
    
    @POST
    @Path("agregar")
    @Produces("application/json")
    @Consumes("application/json")
    public Response agregarTecnico(Tecnico tecnico) {
        int result = 0;
        String mensaje = "";
        
        try {
            if (tecnicoDAO.agregarTecnico(tecnico)>0) {
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
    public Response update(Tecnico tecnico) {
        
        int result = 0;
        String mensaje = "";
        JSONObject json = new JSONObject();
        try {
            
            if (tecnicoDAO.actualizarTecnico(tecnico)) {
                result=1;
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
    
    @GET   
    @Path("/buscar/{id}")
    @Produces(MediaType.APPLICATION_JSON)   
    public Tecnico buscarTecnico(@PathParam(value="id") int id) {   
       Tecnico tecnico = tecnicoDAO.buscarTecnico(id);
       return tecnico;   
    }
    
    @DELETE
    @Path("/eliminar/{id}")
    @Produces("application/json")
    public Response eliminarTecnico(@PathParam(value="id") int id) {  
        int result = 0;
        String mensaje = "";
        JSONObject json = new JSONObject();
         if (tecnicoDAO.eliminarTecnico(id)) {
            result=1;
            mensaje = "Registro anulado";
        }else{
            result=0;
            mensaje = "Error al anular registro";
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

    
    @GET
    @Path("/gerarPdf")
    public Response geraPDF(){

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Map fillParams = new HashMap(); 
        //fillParams.put("IMPRAUTORIZACAO", autorizacao);
        Reporte reporte = new Reporte();
        byte[] bytes= reporte.imprimirVenta(outputStream, fillParams);

        String nomeRelatorio= "mireporte" + ".pdf";
        return Response.ok(bytes).type("application/pdf").header("Content-Disposition", "filename=\"" + nomeRelatorio + "\"").build();
    }

}
