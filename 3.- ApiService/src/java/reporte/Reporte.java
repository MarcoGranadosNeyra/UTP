
package reporte;

import conexion.Conexion;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Map;
import net.sf.jasperreports.engine.JRExporterParameter;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.design.JasperDesign;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.engine.xml.JRXmlLoader;


public class Reporte {
    
    Conexion conexion=new Conexion();
        
    public byte[] imprimirVenta(ByteArrayOutputStream outputStream, Map parametros) {
        JRPdfExporter exporter = new JRPdfExporter();
        try {
            //String reportLocation = httpServletRequest.getRealPath("/") + "resources\\jasper\\" + jasperReportName + ".jrxml";
            /*
            URL res = getClass().getClassLoader().getResource("/WEB-INF/report1.jrxml");
            File file = Paths.get(res.toURI()).toFile();
            String absolutePath = file.getAbsolutePath();
            System.out.println(absolutePath);
            */
            
            String reportLocation = "C:\\report\\"
                    + "imprimirVentaCerrada.jrxml";
              System.out.println(reportLocation);        
              
            /*
                        String reportLocation = "C:\\Marco\\Desarrollo\\UTP\\3.- ApiService\\src\\java\\reporte\\"
                    + "imprimirVentaCerrada.jrxml";
                        */
            InputStream jrxmlInput = new FileInputStream(new File(reportLocation));
            //this.getClass().getClassLoader().getResource("data.jrxml").openStream();
            JasperDesign design = JRXmlLoader.load(jrxmlInput);
            JasperReport jasperReport = JasperCompileManager.compileReport(design);
            //System.out.println("Report compiled");

            //JasperReport jasperReport = JasperCompileManager.compileReport(reportLocation);
            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parametros, conexion.abrirConexion()); // datasource Service

            exporter.setParameter(JRExporterParameter.JASPER_PRINT, jasperPrint);
            exporter.setParameter(JRExporterParameter.OUTPUT_STREAM, outputStream);
            exporter.exportReport();
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Error in generate Report..." + e);
        } finally {
        }
        return outputStream.toByteArray();
    }

}
