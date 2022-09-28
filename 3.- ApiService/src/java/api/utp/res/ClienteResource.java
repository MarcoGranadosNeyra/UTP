package api.utp.res;

import daoImpl.TecnicoDAOImpl;
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
import javax.ws.rs.GET;
import javax.ws.rs.POST;

import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.core.MediaType;
import org.json.simple.JSONObject;
import javax.ws.rs.core.Response;
import reporte.Reporte;

/**
 * REST Web Service
 *
 */
@Path("Cliente")
public class ClienteResource {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of UsuarioResource
     */
    public ClienteResource() {
    }

    /**
     * Retrieves representation of an instance of api.utp.res.UsuarioResource
     *
     * @return an instance of java.lang.String
     */
    @GET
    @Produces("text/html")
    public String getHtml() {
        //TODO return proper representation object
        return "<h1>HOLA BIENVENIDO A LOS USUARIOS<H1>";
    }

    //static final List<Usuario>lista=new ArrayList<>();
    TecnicoDAOImpl usuarioDAO = new TecnicoDAOImpl();
    List<Tecnico> lista = new ArrayList<>();

    @GET
    @Path("list")
    @Produces("application/json")
    public List<Tecnico> ListarUsuarios() {
        lista = usuarioDAO.listarTecnico();
        return lista;
    }

    @POST
    @Path("add")
    @Produces("application/json")
    @Consumes("application/json")
    public String add(Tecnico usuario) {
        int result = 0;
        String mensaje = "";
        JSONObject json = new JSONObject();
        try {
            int id = usuarioDAO.agregarTecnico(usuario);
            if (id>1) {
                result=1;
            }
            mensaje = "Registro agregado";
        } catch (Exception e) {
            mensaje = e.getMessage();
        }

        json.put("result", result);
        json.put("mensaje", mensaje);

        return json.toJSONString();

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

    /**
     * PUT method for updating or creating an instance of UsuarioResource
     *
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.TEXT_HTML)
    public void putHtml(String content) {
    }
}
