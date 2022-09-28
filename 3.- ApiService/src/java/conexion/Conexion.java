package conexion;

import java.sql.Connection;
import java.sql.DriverManager;

public class Conexion {

    Connection cn;
    public Connection abrirConexion(){
        try {
            Class.forName("org.postgresql.Driver");
             cn = DriverManager.getConnection("jdbc:postgresql://192.168.0.106:5432/UTP","postgres", "123456");
             //cn = DriverManager.getConnection("jdbc:postgresql://158.69.48.3:5432/UTP","postgres", "123456");
            System.out.println("conectado a PosgreSQL exitosamente");
        } catch (Exception e) {
            System.out.println("error : "+e.getMessage());
        }
        return cn;
    }
    
    public void cerrarConexion(){
        try {
            cn.close();
            System.out.println("PosgreSQL Cerrado correctamente");
        } catch (Exception e) {
            System.out.println("error : "+e.getMessage());
        }
    }
    
}
