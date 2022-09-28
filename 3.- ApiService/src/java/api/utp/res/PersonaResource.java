package api.utp.res;

import daoImpl.DepartamentoDAOImpl;
import daoImpl.DistritoDAOImpl;
import daoImpl.DocumentoDAOImpl;
import daoImpl.PersonaDAOImpl;
import daoImpl.ProvinciaDAOImpl;
import daoImpl.SexoDAOImpl;
import daoImpl.UsuarioDAOImpl;
import entidad.Departamento;
import entidad.Distrito;
import entidad.Documento;
import entidad.Persona;
import entidad.Provincia;
import entidad.Sexo;
import entidad.Usuario;
import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.POST;

import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.json.simple.JSONObject;

@Path("persona")
public class PersonaResource {

    @Context
    private UriInfo context;

    public PersonaResource() {
    }
    DepartamentoDAOImpl departamentoDAO = new DepartamentoDAOImpl();
    List<Departamento> listarDepartamentos = new ArrayList<>();
    
    ProvinciaDAOImpl provinciaDAO = new ProvinciaDAOImpl();
    List<Provincia> listarProvincias = new ArrayList<>();
    
    DistritoDAOImpl distritoDAO = new DistritoDAOImpl();
    List<Distrito> listarDistritos = new ArrayList<>();
    
    DocumentoDAOImpl documentoDAO = new DocumentoDAOImpl();
    List<Documento> listarDocumento = new ArrayList<>();
    
    SexoDAOImpl sexoDAO = new SexoDAOImpl();
    List<Sexo> listarSexo = new ArrayList<>();
    
    PersonaDAOImpl personaDAO = new PersonaDAOImpl();
    List<Persona> listarPersonas = new ArrayList<>();
    
    @GET
    @Path("departamento")
    @Produces("application/json")
    public List<Departamento> ListarUsuarios() {
        return listarDepartamentos = departamentoDAO.listarDepartamento();
    }
    
    @GET
    @Path("provincia/{id_departamento}")
    @Produces("application/json")
    public List<Provincia> listarProvincias(@PathParam(value="id_departamento") String id_departamento) {
        return listarProvincias = provinciaDAO.listarProvincia(id_departamento);
    }
    
    @GET
    @Path("distrito/{id_provincia}")
    @Produces("application/json")
    public List<Distrito> listarDistritos(@PathParam(value="id_provincia") String id_provincia) {
        return listarDistritos = distritoDAO.listarDistrito(id_provincia);
    }
    
    @GET
    @Path("documento")
    @Produces("application/json")
    public List<Documento> listarDocumento() {
        return listarDocumento = documentoDAO.listarDocumento();
    }
    
    @GET
    @Path("sexo")
    @Produces("application/json")
    public List<Sexo> listarSexo() {
        return listarSexo = sexoDAO.listarSexo();
    }
    
    @GET
    @Path("list")
    @Produces("application/json")
    public List<Persona> ListarPersonas() {
        return listarPersonas = personaDAO.listarPersona("");
    }
    
    @POST
    @Path("add")
    @Produces("application/json")
    @Consumes("application/json")
    public Response agregarPersona(Persona persona) {

        int result = 0;
        int id_persona=0;
        String mensaje = "";
        JSONObject json = new JSONObject();
        try {
            id_persona=personaDAO.agregarPersona(persona);
            if (id_persona>0) {
                result=1;
                mensaje = "Registro Agregado";
            }

        } catch (Exception e) {
            mensaje = e.getMessage();
        }

        json.put("result", result);
        json.put("mensaje", mensaje);
        json.put("id_persona", id_persona);
        
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
    public Response actualizarPersona(Persona persona) {

        int result = 0;
        String mensaje = "";
        JSONObject json = new JSONObject();
        try {
            
            if (personaDAO.actualizarPersona(persona)) {
                result=1;
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
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)   
    public Persona buscarPersona(@PathParam(value="id") int id) {   
       Persona persona = personaDAO.buscarPersona(id);
       return persona;   
    }
    
    @POST
    @Path("validarPersona")
    @Produces(MediaType.APPLICATION_JSON)  
    @Consumes(MediaType.APPLICATION_JSON)
    public Response validarPersona(Persona persona) {
        int result = 0;
        String mensaje = "";
        JSONObject json = new JSONObject();
        JSONObject jsonPersona = new JSONObject();
        JSONObject jsonUsuario = new JSONObject();
        try {
            Persona opersona=personaDAO.buscarPersona(persona.getId_documento(), persona.getNro_documento());
            
            if (opersona!=null) {
                result = 1;
                mensaje = "Registro encontrado";
                jsonPersona.put("id", opersona.getId());
                jsonPersona.put("id_departamento", opersona.getId_departamento());
                jsonPersona.put("id_provincia", opersona.getId_provincia());
                jsonPersona.put("id_distrito", opersona.getId_distrito());
                jsonPersona.put("id_documento", opersona.getId_documento());
                jsonPersona.put("nro_documento", opersona.getNro_documento());
                jsonPersona.put("nombre", opersona.getNombre());
                jsonPersona.put("amaterno", opersona.getAmaterno());
                jsonPersona.put("apaterno", opersona.getApaterno());
                jsonPersona.put("telefono", opersona.getTelefono());
                jsonPersona.put("direccion", opersona.getDireccion());
                jsonPersona.put("fecha_naci", opersona.getFecha_naci().toString());
                jsonPersona.put("id_sexo", opersona.getId_sexo());
                jsonPersona.put("correo", opersona.getCorreo());
                jsonPersona.put("firma", opersona.getFirma());
                jsonPersona.put("huella", opersona.getHuella());
                jsonPersona.put("foto", opersona.getFoto());
                UsuarioDAOImpl usuarioDOA=new UsuarioDAOImpl();
                Usuario usuario=usuarioDOA.buscarUsuarioByIdPersona(opersona.getId());
                if (usuario!=null) {
                    
                    jsonUsuario.put("id", usuario.getId());
                    jsonUsuario.put("id_persona", usuario.getId_persona());
                    jsonUsuario.put("id_rol", usuario.getId_rol());
                    jsonUsuario.put("usuario", usuario.getUsuario());
                    jsonUsuario.put("estado", usuario.isEstado());
                    
                    result = 1;
                    mensaje = "successful";
                    json.put("result", result);
                    json.put("mensaje", mensaje);
                    json.put("persona", jsonPersona);
                    json.put("usuario", jsonUsuario);
                }else{
                    result = 2;
                    mensaje = "successful";
                    json.put("result", result);
                    json.put("mensaje", mensaje);
                    json.put("persona", jsonPersona);
                }
            }else{
                    result = 0;
                    mensaje = "no encontrado";
                    json.put("result", result);
                    json.put("mensaje", mensaje);
            }
        } catch (Exception e) {
            result = 0;
            mensaje = "Error : " + e;
        }

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
