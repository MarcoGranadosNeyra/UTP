
package entidad;

public class CotizacionDetalle {
    private int id_cotizacion;
    private int id_producto;
    private int cantidad;
    private Double precio;
    private Boolean estado;

    public CotizacionDetalle() {
    }

    public int getId_cotizacion() {
        return id_cotizacion;
    }

    public void setId_cotizacion(int id_venta) {
        this.id_cotizacion = id_venta;
    }

    public int getId_producto() {
        return id_producto;
    }

    public void setId_producto(int id_producto) {
        this.id_producto = id_producto;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public Boolean getEstado() {
        return estado;
    }

    public void setEstado(Boolean estado) {
        this.estado = estado;
    }

    
    
}
