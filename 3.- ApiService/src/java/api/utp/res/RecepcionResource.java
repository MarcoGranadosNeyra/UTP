package api.utp.res;

import daoImpl.RecepcionDAOImpl;
import entidad.Recepcion;
import java.io.ByteArrayOutputStream;

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

@Path("recepcion")
public class RecepcionResource {

    @Context
    private UriInfo context;

    public RecepcionResource() {
    }

    RecepcionDAOImpl recepcionDAO = new RecepcionDAOImpl();
    List<Recepcion> listarRecepcion = new ArrayList<>();

    @GET
    @Path("/equipos/recibidos")
    @Produces("application/json")
    public List<Recepcion> listarEquiposRecibidos() {
        listarRecepcion = recepcionDAO.listarEquiposRecibidos();
        return listarRecepcion;
    }
    
    @GET
    @Path("/equipos/entregados")
    @Produces("application/json")
    public List<Recepcion> listarEquiposEntregados() {
        listarRecepcion = recepcionDAO.listarEquiposEntregados();
        return listarRecepcion;
    }

    /*
    @GET
    @Path("list")
    @Produces(MediaType.APPLICATION_JSON)
    public Response ListarRecepcion() {
        JSONArray jsonArrayRecepcion = new JSONArray();
        JSONObject jsonResult = new JSONObject();
         int result = 0;
        String mensaje = "";
        try {
            List<Recepcion> listar = recepcionDAO.listarRecepcion();
                for (Recepcion recepcion : listar) {
                JSONObject data = new JSONObject();
                data.put("id", recepcion.getId());
                data.put("tecnico", recepcion.getTecnico());
                data.put("cliente", recepcion.getCliente());
                data.put("equipo", recepcion.getEquipo());
                data.put("marca", recepcion.getMarca());
                data.put("modelo", recepcion.getModelo());
                data.put("serie", recepcion.getSerie());
                data.put("descripcion", recepcion.getDescripcion());
                data.put("fecha", recepcion.getStrFecha());
                data.put("hora", recepcion.getHora());
                data.put("engregado", recepcion.isEntregado());
                data.put("estado", recepcion.isEstado());
                jsonArrayRecepcion.add(data);
            }
            result = 1;
            mensaje = "successful";
        } catch (Exception e) {
            mensaje = e.getMessage();
        }
        
        jsonResult.put("result", result);
        jsonResult.put("mensaje", mensaje);
        jsonResult.put("recepciones", jsonArrayRecepcion);
        
                return Response
                .status(200)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
                .header("Access-Control-Allow-Credentials", "true")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
                .header("Access-Control-Max-Age", "1209600")
                .entity(jsonResult.toString())
                .build();
    }
    */
    @POST
    @Path("agregar")
    @Produces("application/json")
    @Consumes("application/json")
    public Response agregarRecepcion(Recepcion recepcion) {
        int result = 0;
        String mensaje = "";

        try {
            if (recepcionDAO.agregarRecepcion(recepcion) > 0) {
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
    public Response actualizarRecepcion(Recepcion recepcion) {

        int result = 0;
        String mensaje = "";
        JSONObject json = new JSONObject();
        try {

            if (recepcionDAO.actualizarRecepcion(recepcion)) {
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
    public Recepcion buscarRecepcion(@PathParam(value = "id") int id) {
        Recepcion recepcion = recepcionDAO.buscarRecepcion(id);
        return recepcion;
    }

    @DELETE
    @Path("/eliminar/{id}")
    @Produces("application/json")
    public Response eliminarRecepcion(@PathParam(value = "id") int id) {
        int result = 0;
        String mensaje = "";
        JSONObject json = new JSONObject();
        if (recepcionDAO.eliminarRecepcion(id)) {
            result = 1;
            mensaje = "Registro anulado";
        } else {
            result = 0;
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
    
    @DELETE
    @Path("/finalizar/{id}")
    @Produces("application/json")
    public Response finalizarRecepcion(@PathParam(value = "id") int id) {
        int result = 0;
        String mensaje = "";
        JSONObject json = new JSONObject();
        if (recepcionDAO.finalizarRecepcion(id)) {
            result = 1;
            mensaje = "la recepcion a finalizado";
        } else {
            result = 0;
            mensaje = "Error finalizar la recepcion";
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
    @Path("/imprimirGuiRecepcion/{id}")
    public Response imprimirGuiRecepcion(@PathParam(value = "id") int id) {
        
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Map fillParams = new HashMap();
        fillParams.put("id", id);
        Reporte reporte = new Reporte();
        byte[] bytes = reporte.imprimirGuiaRecepcion(outputStream, fillParams);

        String nombredocumento = "GuiRecepcion" + ".pdf";
        return Response.ok(bytes).type("application/pdf").header("Content-Disposition", "filename=\"" + nombredocumento + "\"").build();
    }
}
