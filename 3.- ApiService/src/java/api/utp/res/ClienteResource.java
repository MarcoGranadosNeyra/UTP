package api.utp.res;

import daoImpl.ClienteDAOImpl;
import entidad.Cliente;
import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
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
@Path("cliente")
public class ClienteResource {

    @Context
    private UriInfo context;

    public ClienteResource() {
    }
    
    ClienteDAOImpl clienteDAO = new ClienteDAOImpl();
    List<Cliente> listarCliente = new ArrayList<>();

    @GET
    @Path("list")
    @Produces("application/json")
    public List<Cliente> ListarCliente() {
        listarCliente = clienteDAO.listarCliente();
        return listarCliente;
    }
    
    @POST
    @Path("agregar")
    @Produces("application/json")
    @Consumes("application/json")
    public Response agregarCliente(Cliente cliente) {
        int result = 0;
        String mensaje = "";
        
        try {
            if (clienteDAO.agregarCliente(cliente)>0) {
                result = 1;
                mensaje = "Registro agregado";
            }
        } catch (Exception e) {
            result = 0;
            mensaje = "Error : "+e;
            System.out.println(e.getMessage());
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
    public Response actualizarCliente(Cliente cliente) {

        int result = 0;
        String mensaje = "";
        JSONObject json = new JSONObject();
        try {

            if (clienteDAO.actualizarCliente(cliente)) {
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
    
    @GET   
    @Path("/buscar/{id}")
    @Produces(MediaType.APPLICATION_JSON)   
    public Cliente buscarCliente(@PathParam(value="id") int id) {   
       Cliente cliente = clienteDAO.buscarCliente(id);
       return cliente;   
    }
    
    @POST
    @Path("validar")
    @Produces(MediaType.APPLICATION_JSON)  
    @Consumes(MediaType.APPLICATION_JSON)
    public Response validarPersona(Cliente cliente) {
        int result = 0;
        String mensaje = "";
        JSONObject json = new JSONObject();
        JSONObject jsonPersona = new JSONObject();
        JSONObject jsonCliente = new JSONObject();
        try {
            Cliente ocliente=clienteDAO.buscarCliente(cliente.getId_documento(), cliente.getNro_documento());
            
            if (ocliente!=null) {
                jsonPersona.put("id", ocliente.getId());
                jsonPersona.put("id_documento", ocliente.getId_documento());
                jsonPersona.put("nro_documento", ocliente.getNro_documento());
                jsonPersona.put("nombre", ocliente.getNombre());
                jsonPersona.put("amaterno", ocliente.getAmaterno());
                jsonPersona.put("apaterno", ocliente.getApaterno());
                jsonPersona.put("telefono", ocliente.getTelefono());
                jsonPersona.put("direccion", ocliente.getDireccion());
                
                result = 1;
                mensaje = "Registro encontrado";
                json.put("persona", jsonPersona);
                json.put("result", result);
                json.put("mensaje", mensaje);
            }else{
                    result = 0;
                    mensaje = "no encontrado";
                    json.put("result", result);
                    json.put("mensaje", mensaje);
            }
        } catch (Exception e) {
            result = 0;
            mensaje = "Error : " + e;
        }

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
    
    @DELETE
    @Path("/eliminar/{id}")
    @Produces("application/json")
    public Response eliminarTecnico(@PathParam(value="id") int id) {  
        int result = 0;
        String mensaje = "";
        JSONObject json = new JSONObject();
         if (clienteDAO.eliminarCliente(id)) {
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
    @Path("/buscar/persona/{id}")
    @Produces(MediaType.APPLICATION_JSON)   
    public Cliente buscarClientePorIdPersona(@PathParam(value="id") int id) {   
       Cliente cliente = clienteDAO.buscarClientePorIdPersona(id);
       return cliente;   
    }
}
