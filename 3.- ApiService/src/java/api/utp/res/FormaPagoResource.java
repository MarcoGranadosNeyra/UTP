
package api.utp.res;

import daoImpl.FormaPagoDAOImpl;
import daoImpl.VentaDAOImpl;
import entidad.FormaPago;
import entidad.Venta;
import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import org.json.simple.JSONObject;
import reporte.Reporte;

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
