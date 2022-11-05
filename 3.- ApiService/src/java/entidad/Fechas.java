
package entidad;

import java.sql.Date;

public class Fechas {
    private Date fecha1;
    private Date fecha2;

    public Fechas() {
    }

    public Fechas(Date fecha1, Date fecha2) {
        this.fecha1 = fecha1;
        this.fecha2 = fecha2;
    }
    
    

    public Date getFecha1() {
        return fecha1;
    }

    public void setFecha1(Date fecha1) {
        this.fecha1 = fecha1;
    }

    public Date getFecha2() {
        return fecha2;
    }

    public void setFecha2(Date fecha2) {
        this.fecha2 = fecha2;
    }
            
   
}
