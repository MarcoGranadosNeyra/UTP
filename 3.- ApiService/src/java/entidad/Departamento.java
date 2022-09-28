
package entidad;

public class Departamento {
    
    private String id;
    private String departamento;

    public Departamento() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDepartamento() {
        return departamento;
    }

    public void setDepartamento(String departamento) {
        this.departamento = departamento;
    }

    @Override
     public String toString()
    {
     return departamento;
    }
    
}
