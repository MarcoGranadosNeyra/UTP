package api.utp.res;

import daoImpl.ClienteDAOImpl;
import daoImpl.CotizacionDAOImpl;
import daoImpl.PersonaDAOImpl;
import entidad.Cliente;
import entidad.Cotizacion;
import entidad.Persona;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
import reporte.Reporte;

@Path("cotizacion")
public class CotizacionResource {

    @Context
    private UriInfo context;

    public CotizacionResource() {
    }

    CotizacionDAOImpl cotizacionDAO = new CotizacionDAOImpl();
    List<Cotizacion> listarCotizacion = new ArrayList<>();

    @GET
    @Path("pendientes")
    @Produces("application/json")
    public List<Cotizacion> listarCotizacionesPendientes() {
        listarCotizacion = cotizacionDAO.listarCotizacionesPendientes();
        return listarCotizacion;
    }
    
    @GET
    @Path("aprobadas")
    @Produces("application/json")
    public List<Cotizacion> listarCotizacionesAprobadas() {
        listarCotizacion = cotizacionDAO.listarCotizacionesAprobadas();
        return listarCotizacion;
    }

    @POST
    @Path("agregar")
    @Produces("application/json")
    @Consumes("application/json")
    public Response agregarCotizacion(Cotizacion cotizacion) {
        int result = 0;
        String mensaje = "";
        int id_cotizacion=0;
        try {
            id_cotizacion=cotizacionDAO.agregarCotizacion(cotizacion);
            if (id_cotizacion > 0) {
                result = 1;
                mensaje = "Registro agregado";
            }
        } catch (Exception e) {
            result = 0;
            mensaje = "Error : " + e;
        }

        JSONObject json = new JSONObject();

        json.put("result", result);
        json.put("mensaje", mensaje);
        json.put("id_cotizacion", id_cotizacion);
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
    @Path("/enviarcorreo/")
    @Produces("application/json")
    public Response enviarCorreo(Cotizacion cotizacion) {
        
        
        ClienteDAOImpl clienteDAO = new ClienteDAOImpl();
        PersonaDAOImpl personaDAO=new PersonaDAOImpl();
                
        int result = 0;
        String mensaje = "";
        JSONObject json = new JSONObject();
  
        Cliente cliente=clienteDAO.buscarCliente(cotizacion.getId_cliente());
        Persona persona=personaDAO.buscarPersona(cliente.getId_persona());
        
        String nombreCliente=persona.getNombreCompleto();
        
        if (enviarPDFporCorreo(cotizacion.getId(),persona.getCorreo().trim(),nombreCliente)) {
            result = 1;
            mensaje = "Cotizacion enviada exitosamente";
        } else {
            result = 0;
            mensaje = "Error al enviar cotizacion";
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
    public Cotizacion buscarCotizacion(@PathParam(value = "id") int id) {
        Cotizacion cotizacion = cotizacionDAO.buscarCotizacion(id);
        return cotizacion;
    }
 
    @DELETE
    @Path("/aprobar/{id}")
    @Produces("application/json")
    public Response aprobarCotizacion(@PathParam(value = "id") int id) {
        int result = 0;
        String mensaje = "";
        JSONObject json = new JSONObject();
        if (cotizacionDAO.aprobarCotizacion(id)) {
            result = 1;
            mensaje = "Registro Actualizado";
        } else {
            result = 0;
            mensaje = "Error al actualizar registro";
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
    @Path("/imprimirCotizacion/{id}")
    public Response imprimirCotizacion(@PathParam(value = "id") int id) {
        System.out.println("id_venta : "+id);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Map fillParams = new HashMap();
        fillParams.put("id", id);
        Reporte reporte = new Reporte();
        byte[] bytes = reporte.imprimirCotizacion(outputStream, fillParams);

        String nomeRelatorio = "cotizacion" + ".pdf";
        return Response.ok(bytes).type("application/pdf").header("Content-Disposition", "filename=\"" + nomeRelatorio + "\"").build();
    }
    
    public boolean enviarPDFporCorreo(int id,String correo,String nombreCliente){
        File directorio = new File("C:\\correo\\");
        eliminarCarpeta(directorio);
        crearCarpeta();
        generarDocumentoPDF(id,nombreCliente);
        boolean result=adjuntarPDF(correo,nombreCliente);
        return result;
    }
    
    void eliminarCarpeta(File pArchivo) {
        if (!pArchivo.exists()) { return; }

        if (pArchivo.isDirectory()) {
            for (File f : pArchivo.listFiles()) {
                eliminarCarpeta(f);  }
        }
        pArchivo.delete();
    }
    
    void crearCarpeta(){
        File directorio = new File("C:\\correo\\");
        if (!directorio.exists()) {
            if (directorio.mkdirs()) {
                System.out.println("Directorio creado");
            } else {
                System.out.println("Error al crear directorio");
            }
        }
    }
    
    void generarDocumentoPDF(int id,String nombreCliente){
        
        Reporte rp = new Reporte();
        rp.guardarCotizacionPDF(id, nombreCliente);
     
    }
    
    public boolean adjuntarPDF(String correo,String nombreCliente){
        
        File directorio = new File("C:\\correo\\");
        File[] adjuntos = directorio.listFiles();

        tools.EmailService enviarCorreo = new tools.EmailService();
        boolean result=enviarCorreo.sendEmail(adjuntos,correo,nombreCliente);
        return result;
    }
}
