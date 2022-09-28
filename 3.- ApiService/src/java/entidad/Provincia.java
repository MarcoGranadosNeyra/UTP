
package entidad;

public class Provincia {
    
    private String id;
    private String provincia;
    private String id_departamento;

    public Provincia() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getProvincia() {
        return provincia;
    }

    public void setProvincia(String provincia) {
        this.provincia = provincia;
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
     return provincia;
    }

}
