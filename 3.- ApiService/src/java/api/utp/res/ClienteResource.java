package api.utp.res;

import daoImpl.ClienteDAOImpl;
import entidad.Cliente;
import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;


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
    List<Cliente> lista = new ArrayList<>();

    @GET   
    @Path("/buscar/{id}")
    @Produces(MediaType.APPLICATION_JSON)   
    public Cliente buscarCliente(@PathParam(value="id") int id) {   
       Cliente cliente = clienteDAO.buscarCliente(id);
       return cliente;   
    }
    
    @GET   
    @Path("/buscar/persona/{id}")
    @Produces(MediaType.APPLICATION_JSON)   
    public Cliente buscarClientePorIdPersona(@PathParam(value="id") int id) {   
       Cliente cliente = clienteDAO.buscarClientePorIdPersona(id);
       return cliente;   
    }
}
