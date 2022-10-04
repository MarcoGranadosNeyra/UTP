package api.utp.res;

import daoImpl.GrupoDAOImpl;
import entidad.Grupo;
import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;

@Path("grupo")
public class GrupoResource {

    @Context
    private UriInfo context;

    public GrupoResource() {
    }

    GrupoDAOImpl grupoDAO = new GrupoDAOImpl();
    List<Grupo> listarGrupo = new ArrayList<>();

    @GET
    @Path("list")
    @Produces("application/json")
    public List<Grupo> listarGrupo() {
        listarGrupo = grupoDAO.listarGrupo();
        return listarGrupo;
    }
    
}
