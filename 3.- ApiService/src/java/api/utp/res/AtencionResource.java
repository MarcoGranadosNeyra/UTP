package api.utp.res;

import daoImpl.AtencionDAOImpl;
import entidad.Atencion;
import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import org.json.simple.JSONObject;
import reporte.Reporte;

@Path("atencion")
public class AtencionResource {

    @Context
    private UriInfo context;

    public AtencionResource() {
    }

    AtencionDAOImpl AtencionDAO = new AtencionDAOImpl();
    List<Atencion> listarAtencion = new ArrayList<>();

   
    @POST
    @Path("agregar")
    @Produces("application/json")
    @Consumes("application/json")
    public Response agregarAtencion(Atencion atencion) {
        int result = 0;
        String mensaje = "";
        int id_atencion=0;
        try {
            id_atencion=AtencionDAO.agregarAtencion(atencion);
            if (id_atencion>0) {
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
        json.put("id_atencion", id_atencion);
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
    @Path("/imprimirHojaServicio/{id}")
    public Response imprimirVenta(@PathParam(value = "id") int id) {
        
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Map fillParams = new HashMap();
        fillParams.put("id", id);
        Reporte reporte = new Reporte();
        byte[] bytes = reporte.imprimirHojaServicio(outputStream, fillParams);

        String nombredocumento = "HojaServicio" + ".pdf";
        return Response.ok(bytes).type("application/pdf").header("Content-Disposition", "filename=\"" + nombredocumento + "\"").build();
    }

}
