package api.utp.res;

import daoImpl.PermisoDAOImpl;
import daoImpl.PersonaDAOImpl;
import daoImpl.RolDAOImpl;
import daoImpl.UsuarioDAOImpl;
import entidad.Permiso;
import entidad.Persona;
import entidad.Rol;
import entidad.Usuario;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.io.ByteArrayOutputStream;
import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;

import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import org.json.simple.JSONObject;
import javax.ws.rs.core.Response;
import org.json.simple.JSONArray;
import reporte.Reporte;

/**
 * REST Web Service
 *
 */
@Path("usuario")
public class UsuarioResource {

    @Context
    private UriInfo context;

    public UsuarioResource() {
    }
    
    RolDAOImpl rolDAO = new RolDAOImpl();
    List<Rol> listarRol = new ArrayList<>();
        
    UsuarioDAOImpl usuarioDAO = new UsuarioDAOImpl();
    List<Usuario> listaUsuario = new ArrayList<>();
    
    @GET
    @Path("roles")
    @Produces("application/json")
    public List<Rol> ListarRol() {
        listarRol = rolDAO.listarRol();
        return listarRol;
    }


    @GET
    @Path("list")
    @Produces("application/json")
    public List<Usuario> ListarUsuarios() {
        listaUsuario = usuarioDAO.listarUsuario();
        return listaUsuario;
    }

    @POST
    @Path("add")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response agregarUsuario(Usuario usuario) {
        int result = 0;
        String mensaje = "";
        JSONObject json = new JSONObject();
        try {
            int id = usuarioDAO.agregarUsuario(usuario);
            if (id > 1) {
                result = 1;
                mensaje = "Registro agregado";
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
    
    @POST
    @Path("actualizar")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response actualizarUsuario(Usuario usuario) {
        int result = 0;
        String mensaje = "";
        JSONObject json = new JSONObject();
        try {
            
            if (usuarioDAO.actualizarUsuario(usuario)) {
                result = 1;
                mensaje = "Registro Actualizado";
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
    
    @POST
    @Path("buscar")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response buscarUsuario(Usuario usuario) {
        int result = 0;
        String mensaje = "usuario no encontrado";
        JSONObject json = new JSONObject();
        try {
            Usuario ousuario = usuarioDAO.buscarUsuario(usuario.getUsuario());
            if (ousuario!=null) {
                result = 1;
                mensaje = "nombre de usuario se encuentra registrado";
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
    
    @POST
    @Path("login")
    @Produces("application/json")
    @Consumes("application/json")
    public Response login(Usuario usuario) {
        int result = 0;
        int id_usuario = 0;
        String mensaje = "";
        String jwt = "";
        JSONObject json = new JSONObject();
        JSONObject jsonPersona = new JSONObject();
        JSONObject jsonRol = new JSONObject();
        JSONArray jsonArrayPermisos = new JSONArray();
        try {
            Usuario user = usuarioDAO.validarUsuario(usuario.getUsuario(), usuario.getPassword());
            if (user == null) {
                //throw new NotFoundException();
                mensaje="Usuario y/o contraseña incorrectos";
            } else {
                PermisoDAOImpl permisoDAO = new PermisoDAOImpl();
                List<Permiso> listarPermiso = permisoDAO.listarPermiso(user.getId());
                PersonaDAOImpl personaDAO = new PersonaDAOImpl();
                Persona persona = personaDAO.buscarPersona(user.getId_persona());
                jsonPersona.put("id", persona.getId());
                jsonPersona.put("nombre", persona.getNombre());
                jsonPersona.put("apaterno", persona.getApaterno());
                jsonPersona.put("amaterno", persona.getAmaterno());
                jsonPersona.put("foto", persona.getFoto());
                RolDAOImpl rolDAO = new RolDAOImpl();
                Rol rol = rolDAO.buscarRol(user.getId_rol());
                jsonRol.put("id", rol.getId());
                jsonRol.put("rol", rol.getRol());

                for (Permiso permiso : listarPermiso) {
                    JSONObject data = new JSONObject();
                    data.put("id", permiso.getId());
                    data.put("modulo", permiso.getModulo());
                    data.put("url", permiso.getUrl());
                    jsonArrayPermisos.add(data);
                }
                Usuario usu = usuarioDAO.buscarUsuario(user.getId());
                String key = usu.getPassword();
                long tiempo = System.currentTimeMillis();
                jwt = Jwts.builder()
                        .signWith(SignatureAlgorithm.HS256, key)
                        .setSubject(persona.getNombreCompleto())
                        .setIssuedAt(new Date(tiempo))
                        .setExpiration(new Date(tiempo + 900000))
                        .claim("id", persona.getId())
                        .compact();

                result = 1;
                id_usuario = user.getId();
                mensaje = "Bienvenido Usuario : " + user.getUsuario();

            }

        } catch (Exception e) {
            mensaje = e.getMessage();
        }

        json.put("result", result);
        json.put("mensaje", mensaje);
        json.put("id_usuario", id_usuario);
        json.put("rol", jsonRol);
        json.put("token", jwt);
        json.put("persona", jsonPersona);
        json.put("permisos", jsonArrayPermisos);

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
    public Usuario buscarUsuario(@PathParam(value = "id") int id) {
        Usuario usuario = usuarioDAO.buscarUsuario(id);
        return usuario;
    }

    @GET
    @Path("modulosUsuario/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response listarModulosUsuario(@PathParam(value = "id") int id) {

        JSONArray jsonArrayPermisos = new JSONArray();
        JSONObject jsonPersona = new JSONObject();
        JSONObject jsonRol = new JSONObject();
        JSONObject jsonResult = new JSONObject();

        int result = 0;
        String mensaje = "";
        try {
            PermisoDAOImpl permisoDAO = new PermisoDAOImpl();
            PersonaDAOImpl personaDAO = new PersonaDAOImpl();
            RolDAOImpl rolDAO = new RolDAOImpl();

            List<Permiso> listarPermiso = permisoDAO.listarPermiso(id);
            Usuario usuario = usuarioDAO.buscarUsuario(id);
            Persona persona = personaDAO.buscarPersona(usuario.getId_persona());
            Rol rol = rolDAO.buscarRol(usuario.getId_rol());

            for (Permiso permiso : listarPermiso) {
                JSONObject data = new JSONObject();
                data.put("id", permiso.getId());
                data.put("modulo", permiso.getModulo());
                data.put("url", permiso.getUrl());
                jsonArrayPermisos.add(data);
            }

            jsonPersona.put("id", persona.getId());
            jsonPersona.put("nombre", persona.getNombre());
            jsonPersona.put("apaterno", persona.getApaterno());
            jsonPersona.put("amaterno", persona.getAmaterno());
            jsonPersona.put("foto", persona.getFoto());

            jsonRol.put("id", rol.getId());
            jsonRol.put("rol", rol.getRol());

            result = 1;

            mensaje = "successful";

        } catch (Exception e) {
            mensaje = e.getMessage();
        }

        jsonResult.put("result", result);
        jsonResult.put("mensaje", mensaje);
        jsonResult.put("rol", jsonRol);
        jsonResult.put("persona", jsonPersona);
        jsonResult.put("modulos", jsonArrayPermisos);

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

    @GET
    @Path("/gerarPdf")
    public Response geraPDF() {

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Map fillParams = new HashMap();
        //fillParams.put("IMPRAUTORIZACAO", autorizacao);
        Reporte reporte = new Reporte();
        byte[] bytes = reporte.imprimirVenta(outputStream, fillParams);

        String nomeRelatorio = "mireporte" + ".pdf";
        return Response.ok(bytes).type("application/pdf").header("Content-Disposition", "filename=\"" + nomeRelatorio + "\"").build();
    }

}
