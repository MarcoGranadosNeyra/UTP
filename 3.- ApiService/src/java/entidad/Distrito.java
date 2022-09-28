
package entidad;

public class Distrito {
    
    private String id;
    private String distrito;
    private String id_provincia;
    private String id_departamento;

    public Distrito() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDistrito() {
        return distrito;
    }

    public void setDistrito(String distrito) {
        this.distrito = distrito;
    }

    public String getId_provincia() {
        return id_provincia;
    }

    public void setId_provincia(String id_provincia) {
        this.id_provincia = id_provincia;
    }

    public String getId_departamento() {
        return id_departamento;
    }

    public void setId_departamento(String id_departamento) {
        this.id_departamento = id_departamento;
    }

    @Override
     public String toString()
    {
     return distrito;
    }
    
}
