
package api.utp.res;

import daoImpl.VentaDAOImpl;
import entidad.Fechas;
import entidad.Venta;
import java.io.ByteArrayOutputStream;
import java.sql.Date;
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
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import reporte.Reporte;

@Path("/venta")
public class VentaResource {
    
    @Context
    private UriInfo context;

    public VentaResource() {
    }
    
    VentaDAOImpl ventaDAO = new VentaDAOImpl();
    List<Venta> listarVenta = new ArrayList<>();
    
    @GET
    @Path("list")
    @Produces("application/json")
    public List<Venta> ListarVenta() {
        listarVenta = ventaDAO.listarVenta();
        return listarVenta;
    }
    
    @GET
    @Path("listServicio")
    @Produces("application/json")
    public List<Venta> ListarVentaServicio() {
        listarVenta = ventaDAO.listarVentaServicio();
        return listarVenta;
    }
    
    @POST
    @Path("add")
    @Produces("application/json")
    @Consumes("application/json")
    public Response agregarVenta(Venta venta) {
        int result = 0;
        String mensaje = "";
        int id_venta=0;
        try {
            id_venta=ventaDAO.agregarVenta(venta);
            if (id_venta>0) {
                result = 1;
                mensaje = "Registro agregado";
            }
        } catch (Exception e) {
            result = 0;
            mensaje = "Error : "+e;
        }

        JSONObject json = new JSONObject();
      
        json.put("result", result);
        json.put("mensaje", mensaje);
        json.put("id_venta", id_venta);

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
    @Path("/imprimirVenta/{id}")
    public Response imprimirVenta(@PathParam(value = "id") int id) {
        System.out.println("id_venta : "+id);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Map fillParams = new HashMap();
        fillParams.put("id", id);
        Reporte reporte = new Reporte();
        byte[] bytes = reporte.imprimirVenta(outputStream, fillParams);

        String nomeRelatorio = "Venta" + ".pdf";
        return Response.ok(bytes).type("application/pdf").header("Content-Disposition", "filename=\"" + nomeRelatorio + "\"").build();
    }
    
    @GET
    @Path("/imprimirHojaServicioVenta/{id}")
    public Response imprimirHojaServicioVenta(@PathParam(value = "id") int id) {
        
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Map fillParams = new HashMap();
        fillParams.put("id", id);
        Reporte reporte = new Reporte();
        byte[] bytes = reporte.imprimirHojaServicioVenta(outputStream, fillParams);

        String nomeRelatorio = "HojaServicioVenta" + ".pdf";
        return Response.ok(bytes).type("application/pdf").header("Content-Disposition", "filename=\"" + nomeRelatorio + "\"").build();
    }
    
    @POST
    @Path("reporteVentas")
    @Produces("application/json")
    @Consumes("application/json")
    public Response reporteVentas(Fechas fecha) {
        int result = 0;
        String mensaje = "";
        
        JSONObject json = new JSONObject();
        JSONArray jsonArray = new JSONArray();
        
        try {
        VentaDAOImpl ventaDAO = new VentaDAOImpl();

        List<Venta> listarVentas = ventaDAO.listarReporteVentas(fecha.getFecha1(),fecha.getFecha2());
                for (Venta venta : listarVentas) {
                    JSONObject data = new JSONObject();
                    data.put("id", venta.getId());
                    data.put("vendedor", venta.getVendedor());
                    data.put("cliente", venta.getCliente());
                    data.put("monto", venta.getMonto());
                    data.put("fecha", venta.getStrFecha());
                    data.put("hora", venta.getHora());
                    jsonArray.add(data);
                }
        
            
        } catch (Exception e) {
            result = 0;
            mensaje = "Error : "+e;
        }

        json.put("result", result);
        json.put("mensaje", mensaje);
        json.put("permisos", jsonArray);

        return Response
                .status(200)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
                .header("Access-Control-Allow-Credentials", "true")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
                .header("Access-Control-Max-Age", "1209600")
                .entity(jsonArray.toString())
                .build();
    }
           
    @POST
    @Path("productosVendidos")
    @Produces("application/json")
    @Consumes("application/json")
    public Response productosVendidos(Fechas fecha) {
        int result = 0;
        String mensaje = "";
        
        JSONObject json = new JSONObject();
        JSONArray jsonArray = new JSONArray();
        
        try {
        VentaDAOImpl ventaDAO = new VentaDAOImpl();

        List<Venta> listarVentas = ventaDAO.listarReporteProductosVendidos(fecha.getFecha1(),fecha.getFecha2());
                for (Venta venta : listarVentas) {
                    JSONObject data = new JSONObject();
                    data.put("producto", venta.getProducto());
                    data.put("cantidad", venta.getCantidad());
                    data.put("monto", venta.getMonto());
                    jsonArray.add(data);
                }
        
            
        } catch (Exception e) {
            result = 0;
            mensaje = "Error : "+e;
        }

        json.put("result", result);
        json.put("mensaje", mensaje);
        json.put("permisos", jsonArray);

        return Response
                .status(200)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
                .header("Access-Control-Allow-Credentials", "true")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
                .header("Access-Control-Max-Age", "1209600")
                .entity(jsonArray.toString())
                .build();
    }
    
    @POST
    @Path("repuestosVendidos")
    @Produces("application/json")
    @Consumes("application/json")
    public Response repuestosVendidos(Fechas fecha) {
        int result = 0;
        String mensaje = "";
        
        JSONObject json = new JSONObject();
        JSONArray jsonArray = new JSONArray();
        
        try {
        VentaDAOImpl ventaDAO = new VentaDAOImpl();

        List<Venta> listarVentas = ventaDAO.listarReporteRepuestosVendidos(fecha.getFecha1(),fecha.getFecha2());
                for (Venta venta : listarVentas) {
                    JSONObject data = new JSONObject();
                    data.put("producto", venta.getProducto());
                    data.put("cantidad", venta.getCantidad());
                    data.put("monto", venta.getMonto());
                    jsonArray.add(data);
                }
        
            
        } catch (Exception e) {
            result = 0;
            mensaje = "Error : "+e;
        }

        json.put("result", result);
        json.put("mensaje", mensaje);
        json.put("permisos", jsonArray);

        return Response
                .status(200)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
                .header("Access-Control-Allow-Credentials", "true")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
                .header("Access-Control-Max-Age", "1209600")
                .entity(jsonArray.toString())
                .build();
    }
    
    @POST
    @Path("serviciosVendidos")
    @Produces("application/json")
    @Consumes("application/json")
    public Response serviciosVendidos(Fechas fecha) {
        int result = 0;
        String mensaje = "";
        
        JSONObject json = new JSONObject();
        JSONArray jsonArray = new JSONArray();
        
        try {
        VentaDAOImpl ventaDAO = new VentaDAOImpl();

        List<Venta> listarVentas = ventaDAO.listarReporteServiciosVendidos(fecha.getFecha1(),fecha.getFecha2());
                for (Venta venta : listarVentas) {
                    JSONObject data = new JSONObject();
                    data.put("producto", venta.getProducto());
                    data.put("cantidad", venta.getCantidad());
                    data.put("monto", venta.getMonto());
                    jsonArray.add(data);
                }
        
            
        } catch (Exception e) {
            result = 0;
            mensaje = "Error : "+e;
        }

        json.put("result", result);
        json.put("mensaje", mensaje);
        json.put("permisos", jsonArray);

        return Response
                .status(200)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
                .header("Access-Control-Allow-Credentials", "true")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
                .header("Access-Control-Max-Age", "1209600")
                .entity(jsonArray.toString())
                .build();
    }
    
    @POST
    @Path("atencionesTecnico")
    @Produces("application/json")
    @Consumes("application/json")
    public Response atencionesTecnico(Fechas fecha) {
        int result = 0;
        String mensaje = "";
        
        JSONObject json = new JSONObject();
        JSONArray jsonArray = new JSONArray();
        
        try {
        VentaDAOImpl ventaDAO = new VentaDAOImpl();

        List<Venta> listarVentas = ventaDAO.listarReporteAtencionesTecnico(fecha.getFecha1(),fecha.getFecha2());
                for (Venta venta : listarVentas) {
                    JSONObject data = new JSONObject();
                    data.put("cantidad", venta.getCantidad());
                    data.put("tecnico", venta.getTecnico());
                    data.put("monto", venta.getMonto());
                    jsonArray.add(data);
                }
        
            
        } catch (Exception e) {
            result = 0;
            mensaje = "Error : "+e;
        }

        json.put("result", result);
        json.put("mensaje", mensaje);
        json.put("permisos", jsonArray);

        return Response
                .status(200)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
                .header("Access-Control-Allow-Credentials", "true")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
                .header("Access-Control-Max-Age", "1209600")
                .entity(jsonArray.toString())
                .build();
    }
    
    @GET
    @Path("/reporteVentasPDF/{fecha1}/{fecha2}")
    @Produces("application/json")
    @Consumes("application/json")
    public Response imprimirReporteVentas(@PathParam("fecha1") Date fecha1,
                                          @PathParam("fecha2") Date fecha2) {

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Map fillParams = new HashMap();
        fillParams.put("fecha1", fecha1);
        fillParams.put("fecha2", fecha2);
        Reporte reporte = new Reporte();
        byte[] bytes = reporte.imprimirReporteVenta(outputStream, fillParams);

        String nomeRelatorio = "reporteVentas" + ".pdf";
        return Response.ok(bytes).type("application/pdf").header("Content-Disposition", "filename=\"" + nomeRelatorio + "\"").build();
    }
    
    @GET
    @Path("/reporteProductosVendidosPDF/{fecha1}/{fecha2}")
    @Produces("application/json")
    @Consumes("application/json")
    public Response imprimirReporteProductosVendidos(@PathParam("fecha1") Date fecha1,
                                          @PathParam("fecha2") Date fecha2) {

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Map fillParams = new HashMap();
        fillParams.put("fecha1", fecha1);
        fillParams.put("fecha2", fecha2);
        Reporte reporte = new Reporte();
        byte[] bytes = reporte.imprimirReporteProductosVendidos(outputStream, fillParams);

        String nomeRelatorio = "reporteProductosVendidos" + ".pdf";
        return Response.ok(bytes).type("application/pdf").header("Content-Disposition", "filename=\"" + nomeRelatorio + "\"").build();
    }
    
    @GET
    @Path("/reporteRepuestosVendidosPDF/{fecha1}/{fecha2}")
    @Produces("application/json")
    @Consumes("application/json")
    public Response imprimirReporteRepuestosVendidos(@PathParam("fecha1") Date fecha1,
                                          @PathParam("fecha2") Date fecha2) {

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Map fillParams = new HashMap();
        fillParams.put("fecha1", fecha1);
        fillParams.put("fecha2", fecha2);
        Reporte reporte = new Reporte();
        byte[] bytes = reporte.imprimirReporteRepuestosVendidos(outputStream, fillParams);

        String nomeRelatorio = "reporteRepuestosVendidos" + ".pdf";
        return Response.ok(bytes).type("application/pdf").header("Content-Disposition", "filename=\"" + nomeRelatorio + "\"").build();
    }
    
    @GET
    @Path("/reporteServiciosVendidosPDF/{fecha1}/{fecha2}")
    @Produces("application/json")
    @Consumes("application/json")
    public Response imprimirReporteServiciosVendidos(@PathParam("fecha1") Date fecha1,
                                          @PathParam("fecha2") Date fecha2) {

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Map fillParams = new HashMap();
        fillParams.put("fecha1", fecha1);
        fillParams.put("fecha2", fecha2);
        Reporte reporte = new Reporte();
        byte[] bytes = reporte.imprimirReporteServiciosVendidos(outputStream, fillParams);

        String nomeRelatorio = "reporteServiciosVendidos" + ".pdf";
        return Response.ok(bytes).type("application/pdf").header("Content-Disposition", "filename=\"" + nomeRelatorio + "\"").build();
    }
    
    @GET
    @Path("/reporteAtencionesTecnicoPDF/{fecha1}/{fecha2}")
    @Produces("application/json")
    @Consumes("application/json")
    public Response imprimirReporteAtencionesTecnico(@PathParam("fecha1") Date fecha1,
                                          @PathParam("fecha2") Date fecha2) {

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Map fillParams = new HashMap();
        fillParams.put("fecha1", fecha1);
        fillParams.put("fecha2", fecha2);
        Reporte reporte = new Reporte();
        byte[] bytes = reporte.imprimirReporteAtencionesTecnico(outputStream, fillParams);

        String nomeRelatorio = "reporteAtencionesTecnico" + ".pdf";
        return Response.ok(bytes).type("application/pdf").header("Content-Disposition", "filename=\"" + nomeRelatorio + "\"").build();
    }
    
}
