package api.utp.res;


import daoImpl.ModuloDAOImpl;

import entidad.Modulo;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.GET;

import javax.ws.rs.Path;

import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;

import javax.ws.rs.core.UriInfo;


@Path("pago")
public class PagoResource {

    @Context
    private UriInfo context;

    public PagoResource() {
    }

    ModuloDAOImpl moduloDAO = new ModuloDAOImpl();
    List<Modulo> listarModulo = new ArrayList<>();

    @GET
    @Path("list")
    @Produces("application/json")
    public List<Modulo> ListarModulo() {
        listarModulo = moduloDAO.listarModulo();
        return listarModulo;
    }

}
