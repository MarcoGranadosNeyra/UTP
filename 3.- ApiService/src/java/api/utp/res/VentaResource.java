
package api.utp.res;

import daoImpl.VentaDAOImpl;
import entidad.Venta;
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

@Path("venta")
public class VentaResource {
    
    @Context
    private UriInfo context;

    public VentaResource() {
    }
    
    VentaDAOImpl ventaDAO = new VentaDAOImpl();
    List<Venta> listarVenta = new ArrayList<>();
    
    @POST
    @Path("add")
    @Produces("application/json")
    @Consumes("application/json")
    public Response agregarVenta(Venta venta) {
        int result = 0;
        String mensaje = "";
        int id_venta=0;
        try {
            id_venta=ventaDAO.agregarVenta(venta);
            if (id_venta>0) {
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
        json.put("id_venta", id_venta);

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
    @Path("/imprimirVenta/{id}")
    public Response imprimirVenta(@PathParam(value = "id") int id) {
        System.out.println("id_venta : "+id);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Map fillParams = new HashMap();
        fillParams.put("id", id);
        Reporte reporte = new Reporte();
        byte[] bytes = reporte.imprimirVenta(outputStream, fillParams);

        String nomeRelatorio = "mireporte" + ".pdf";
        return Response.ok(bytes).type("application/pdf").header("Content-Disposition", "filename=\"" + nomeRelatorio + "\"").build();
    }
       
    @GET
    @Path("/gerarPdf")
    public Response imprimirVenta() {

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Map fillParams = new HashMap();
        fillParams.put("id", 72);
        Reporte reporte = new Reporte();
        byte[] bytes = reporte.imprimirVenta(outputStream, fillParams);

        String nomeRelatorio = "mireporte" + ".pdf";
        return Response.ok(bytes).type("application/pdf").header("Content-Disposition", "filename=\"" + nomeRelatorio + "\"").build();
    }
    
}
