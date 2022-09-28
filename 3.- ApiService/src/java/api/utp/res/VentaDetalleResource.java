
package api.utp.res;

import daoImpl.VentaDetalleDAOImpl;
import entidad.VentaDetalle;
import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import org.json.simple.JSONObject;

@Path("detalle")
public class VentaDetalleResource {
    
    @Context
    private UriInfo context;

    public VentaDetalleResource() {
    }
    
    VentaDetalleDAOImpl ventaDetalleDAO = new VentaDetalleDAOImpl();
    List<VentaDetalle> listarDetalleVenta = new ArrayList<>();
    
    @POST
    @Path("add")
    @Produces("application/json")
    @Consumes("application/json")
    public Response agregarVentaDetalle(VentaDetalle detalle) {
        int result = 0;
        String mensaje = "";
        
        try {

            if (ventaDetalleDAO.agregarDetalleVenta(detalle)) {
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
    
}
