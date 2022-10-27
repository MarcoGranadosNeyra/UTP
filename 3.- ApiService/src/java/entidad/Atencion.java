
package entidad;

import java.sql.Date;

public class Atencion {
    private Integer id;
    private Integer id_venta;
    private Integer id_calendario;
    private Integer id_tipo_atencion;
    private Date fecha;
    private String hora;
    
    //referencias
    private String producto;
    private Double precio;
    private String cliente;
    private String tecnico;
    private String strfecha;
    private String dia;
    private String atencion;

    public Atencion() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId_venta() {
        return id_venta;
    }

    public void setId_venta(Integer id_venta) {
        this.id_venta = id_venta;
    }

    public Integer getId_calendario() {
        return id_calendario;
    }

    public void setId_calendario(Integer id_calendario) {
        this.id_calendario = id_calendario;
    }

    public Integer getId_tipo_atencion() {
        return id_tipo_atencion;
    }

    public void setId_tipo_atencion(Integer id_tipo_atencion) {
        this.id_tipo_atencion = id_tipo_atencion;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public String getHora() {
        return hora;
    }

    public void setHora(String hora) {
        this.hora = hora;
    }

    public String getProducto() {
        return producto;
    }

    public void setProducto(String producto) {
        this.producto = producto;
    }

    public String getTecnico() {
        return tecnico;
    }

    public void setTecnico(String tecnico) {
        this.tecnico = tecnico;
    }

    public String getDia() {
        return dia;
    }

    public void setDia(String dia) {
        this.dia = dia;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public String getAtencion() {
        return atencion;
    }

    public void setAtencion(String atencion) {
        this.atencion = atencion;
    }

    public String getCliente() {
        return cliente;
    }

    public void setCliente(String cliente) {
        this.cliente = cliente;
    }

    public String getStrfecha() {
        return strfecha;
    }

    public void setStrfecha(String strfecha) {
        this.strfecha = strfecha;
    }
    
    
    
    
    
}
