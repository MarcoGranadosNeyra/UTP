
package entidad;

import java.sql.Date;

public class Persona {
    private int id;
    private String id_departamento;
    private String id_provincia;
    private String id_distrito;
    private int id_documento;
    private String nro_documento;
    private String nombre;
    private String apaterno;
    private String amaterno;
    private String telefono;
    private String direccion;
    private Date fecha_naci;
    private int id_sexo;
    private String correo;
    private String firma;
    private String huella;
    private String foto;
    
    //REFERENCIAS
    private String departamento;
    private String provincia;
    private String distrito;
    private String documento;
    private String sexo;
    
    private String nombres;
    private String Strfecha_naci;
    
    public Persona() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getId_departamento() {
        return id_departamento;
    }

    public void setId_departamento(String id_departamento) {
        this.id_departamento = id_departamento;
    }

    public String getId_provincia() {
        return id_provincia;
    }

    public void setId_provincia(String id_provincia) {
        this.id_provincia = id_provincia;
    }

    public String getId_distrito() {
        return id_distrito;
    }

    public void setId_distrito(String id_distrito) {
        this.id_distrito = id_distrito;
    }

    public int getId_documento() {
        return id_documento;
    }

    public void setId_documento(int id_documento) {
        this.id_documento = id_documento;
    }

    public String getNro_documento() {
        return nro_documento;
    }

    public void setNro_documento(String nro_documento) {
        this.nro_documento = nro_documento;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApaterno() {
        return apaterno;
    }

    public void setApaterno(String apaterno) {
        this.apaterno = apaterno;
    }

    public String getAmaterno() {
        return amaterno;
    }

    public void setAmaterno(String amaterno) {
        this.amaterno = amaterno;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public Date getFecha_naci() {
        return fecha_naci;
    }

    public void setFecha_naci(Date fecha_naci) {
        this.fecha_naci = fecha_naci;
    }

    public int getId_sexo() {
        return id_sexo;
    }

    public void setId_sexo(int id_sexo) {
        this.id_sexo = id_sexo;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getFirma() {
        return firma;
    }

    public void setFirma(String firma) {
        this.firma = firma;
    }

    public String getHuella() {
        return huella;
    }

    public void setHuella(String huella) {
        this.huella = huella;
    }

    public String getFoto() {
        return foto;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

    public String getDepartamento() {
        return departamento;
    }

    public void setDepartamento(String departamento) {
        this.departamento = departamento;
    }

    public String getProvincia() {
        return provincia;
    }

    public void setProvincia(String provincia) {
        this.provincia = provincia;
    }

    public String getDistrito() {
        return distrito;
    }

    public void setDistrito(String distrito) {
        this.distrito = distrito;
    }

    public String getDocumento() {
        return documento;
    }

    public void setDocumento(String documento) {
        this.documento = documento;
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }
    
    public String getNombreCompleto(){
        return this.nombre+" "+this.apaterno+" "+this.amaterno;
    }

    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public String getStrfecha_naci() {
        return Strfecha_naci;
    }

    public void setStrfecha_naci(String Strfecha_naci) {
        this.Strfecha_naci = Strfecha_naci;
    }
    
    
    
    
    
    
    
}
