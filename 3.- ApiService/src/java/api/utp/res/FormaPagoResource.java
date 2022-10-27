
package api.utp.res;

import daoImpl.FormaPagoDAOImpl;
import entidad.FormaPago;
import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;

@Path("formapago")
public class FormaPagoResource {
    
    @Context
    private UriInfo context;

    public FormaPagoResource() {
    }
    
    FormaPagoDAOImpl formaPagoDAO = new FormaPagoDAOImpl();
    List<FormaPago> listarFormaPago = new ArrayList<>();
    
    @GET
    @Path("list")
    @Produces("application/json")
    public List<FormaPago> ListarFormaPago() {
         listarFormaPago = formaPagoDAO.listarFormaPago();
         return listarFormaPago;
    }
    
}
