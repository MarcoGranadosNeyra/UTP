
package api.utp.res;

import java.util.Set;
import javax.ws.rs.core.Application;


@javax.ws.rs.ApplicationPath("webresources")
public class ApplicationConfig extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new java.util.HashSet<>();
        addRestResourceClasses(resources);
        return resources;
    }

 
    private void addRestResourceClasses(Set<Class<?>> resources) {
        //resources.add(api.utp.res.ClienteResource.class);
        resources.add(api.utp.res.CalendarioResource.class);
        resources.add(api.utp.res.CategoriaResource.class);
        resources.add(api.utp.res.ClienteResource.class);
        resources.add(api.utp.res.CrossOriginResourceSharingFilter.class);
        resources.add(api.utp.res.FormaPagoResource.class);
        resources.add(api.utp.res.ModuloResource.class);
        resources.add(api.utp.res.PagoResource.class);
        resources.add(api.utp.res.PersonaResource.class);
        resources.add(api.utp.res.ProductoResource.class);
        resources.add(api.utp.res.RepuestoResource.class);
        resources.add(api.utp.res.TecnicoResource.class);
        resources.add(api.utp.res.UsuarioResource.class);
        resources.add(api.utp.res.VentaDetalleResource.class);
        resources.add(api.utp.res.VentaResource.class);
    }
    
}
