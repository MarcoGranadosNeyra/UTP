package api.utp.res;

import daoImpl.PermisoDAOImpl;
import entidad.Permiso;
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


@Path("permiso")
public class PermisoResource {

    @Context
    private UriInfo context;

    public PermisoResource() {
    }

    PermisoDAOImpl PermisoDAO = new PermisoDAOImpl();
    List<Permiso> listarPermiso = new ArrayList<>();

    @GET
    @Path("list")
    @Produces("application/json")
    public List<Permiso> ListarPermiso() {
        listarPermiso = PermisoDAO.listarPermiso();
        return listarPermiso;
    }
    

    @POST
    @Path("agregar")
    @Produces("application/json")
    @Consumes("application/json")
    public Response agregarPermiso(Permiso permiso) {
        int result = 0;
        String mensaje = "";

        try {
            if (PermisoDAO.agregarPermiso(permiso) > 0) {
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
    public Response actualizarPermiso(Permiso permiso) {

        int result = 0;
        String mensaje = "";
        JSONObject json = new JSONObject();
        try {

            if (PermisoDAO.actualizarPermiso(permiso)) {
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
    public Permiso buscarPermiso(@PathParam(value = "id") int id) {
        Permiso permiso = PermisoDAO.buscarPermiso(id);
        return permiso;
    }

    @DELETE
    @Path("/eliminar/{id}")
    @Produces("application/json")
    public Response eliminarPermiso(@PathParam(value = "id") int id) {
        int result = 0;
        String mensaje = "";
        JSONObject json = new JSONObject();
        if (PermisoDAO.eliminarPermiso(id)) {
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
}
