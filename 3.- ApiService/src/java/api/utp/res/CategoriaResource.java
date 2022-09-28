package api.utp.res;

import daoImpl.CategoriaDAOImpl;
import entidad.Categoria;

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

@Path("categoria")
public class CategoriaResource {

    @Context
    private UriInfo context;

    public CategoriaResource() {
    }

    CategoriaDAOImpl categoriaDAO = new CategoriaDAOImpl();
    List<Categoria> listarCategoria = new ArrayList<>();

    @GET
    @Path("list")
    @Produces("application/json")
    public List<Categoria> ListarCategoria() {
        listarCategoria = categoriaDAO.listarCategoria();
        return listarCategoria;
    }

    @POST
    @Path("agregar")
    @Produces("application/json")
    @Consumes("application/json")
    public Response agregarCategoria(Categoria categoria) {
        int result = 0;
        String mensaje = "";

        try {
            if (categoriaDAO.agregarCategoria(categoria) > 0) {
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
    public Response update(Categoria categoria) {

        int result = 0;
        String mensaje = "";
        JSONObject json = new JSONObject();
        try {

            if (categoriaDAO.actualizarCategoria(categoria)) {
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
    public Categoria buscarCategoria(@PathParam(value = "id") int id) {
        Categoria categoria = categoriaDAO.buscarCategoria(id);
        return categoria;
    }

    @DELETE
    @Path("/eliminar/{id}")
    @Produces("application/json")
    public Response eliminarCategoria(@PathParam(value = "id") int id) {
        int result = 0;
        String mensaje = "";
        JSONObject json = new JSONObject();
        if (categoriaDAO.eliminarCategoria(id)) {
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
