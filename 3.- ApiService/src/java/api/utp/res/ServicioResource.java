
package api.utp.res;

import daoImpl.ProductoDAOImpl;
import entidad.Producto;
import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import org.json.simple.JSONObject;

@Path("servicio")
public class ServicioResource {
    
    @Context
    private UriInfo context;

    public ServicioResource() {
    }
    
    ProductoDAOImpl productoDAO = new ProductoDAOImpl();
    List<Producto> listarProducto = new ArrayList<>();


    @GET
    @Path("list")
    @Produces("application/json")
    public List<Producto> ListarProducto() {
         listarProducto = productoDAO.listarServicio();
         return listarProducto;
    }
    
    @POST
    @Path("agregar")
    @Produces("application/json")
    @Consumes("application/json")
    public Response agregarServicio(Producto producto) {
        int result = 0;
        String mensaje = "";
        
        try {
            if (productoDAO.agregarServicio(producto)>0) {
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
    public Response actualizarServicio(Producto producto) {
        int result = 0;
        String mensaje = "";
        
        try {
            if (productoDAO.actualizarServicio(producto)) {
                result = 1;
                mensaje = "Registro actualizado";
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
    
    @GET   
    @Path("/buscar/{id}")
    @Produces(MediaType.APPLICATION_JSON)   
    public Producto buscarServicio(@PathParam(value="id") int id) {   
       Producto producto = productoDAO.buscarServicio(id);
       return producto;   
    }
    
    @DELETE
    @Path("/eliminar/{id}")
    @Produces("application/json")
    public Response eliminarServicio(@PathParam(value="id") int id) {  
        int result = 0;
        String mensaje = "";
        JSONObject json = new JSONObject();
         if (productoDAO.eliminarServicio(id)) {
            result=1;
            mensaje = "Registro desactivado";
        }else{
            result=0;
            mensaje = "Error al desactivar registro";
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
