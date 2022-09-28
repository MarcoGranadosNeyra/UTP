
package entidad;

public class Pago {
    private Integer id;
    private Integer id_venta;
    private Integer id_forma_pago;
    private Double monto;
    private Boolean estado;

    public Pago() {
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

    public Integer getId_forma_pago() {
        return id_forma_pago;
    }

    public void setId_forma_pago(Integer id_forma_pago) {
        this.id_forma_pago = id_forma_pago;
    }

    public Double getMonto() {
        return monto;
    }

    public void setMonto(Double monto) {
        this.monto = monto;
    }

    public Boolean getEstado() {
        return estado;
    }

    public void setEstado(Boolean estado) {
        this.estado = estado;
    }
    
    
  
}
