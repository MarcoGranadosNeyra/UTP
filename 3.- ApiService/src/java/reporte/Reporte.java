
package reporte;

import conexion.Conexion;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import javax.swing.JOptionPane;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRExporter;
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
    
    public byte[] imprimirHojaServicioVenta(ByteArrayOutputStream outputStream, Map parametros) {
        JRPdfExporter exporter = new JRPdfExporter();
        try {
            
            String reportLocation = "C:\\report\\HojaServicioVenta\\"
                    + "HojaServicioVenta.jrxml";
              System.out.println(reportLocation);        
              
            InputStream jrxmlInput = new FileInputStream(new File(reportLocation));

            JasperDesign design = JRXmlLoader.load(jrxmlInput);
            JasperReport jasperReport = JasperCompileManager.compileReport(design);

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
    
    public byte[] imprimirHojaServicio(ByteArrayOutputStream outputStream, Map parametros) {
        JRPdfExporter exporter = new JRPdfExporter();
        try {

            String reportLocation = "C:\\report\\HojaServicio\\"
                    + "HojaServicio.jrxml";
                  
            InputStream jrxmlInput = new FileInputStream(new File(reportLocation));
            JasperDesign design = JRXmlLoader.load(jrxmlInput);
            JasperReport jasperReport = JasperCompileManager.compileReport(design);
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
    
    public byte[] imprimirGuiaRecepcion(ByteArrayOutputStream outputStream, Map parametros) {
        JRPdfExporter exporter = new JRPdfExporter();
        try {

            String reportLocation = "C:\\report\\GuiaRecepcion\\"
                    + "GuiaRecepcion.jrxml";
                  
            InputStream jrxmlInput = new FileInputStream(new File(reportLocation));
            JasperDesign design = JRXmlLoader.load(jrxmlInput);
            JasperReport jasperReport = JasperCompileManager.compileReport(design);
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
    
    public byte[] imprimirCotizacion(ByteArrayOutputStream outputStream, Map parametros) {
        JRPdfExporter exporter = new JRPdfExporter();
        try {
            //String reportLocation = httpServletRequest.getRealPath("/") + "resources\\jasper\\" + jasperReportName + ".jrxml";
            /*
            URL res = getClass().getClassLoader().getResource("/WEB-INF/report1.jrxml");
            File file = Paths.get(res.toURI()).toFile();
            String absolutePath = file.getAbsolutePath();
            System.out.println(absolutePath);
            */
            
            String reportLocation = "C:\\report\\Cotizacion\\"
                    + "Cotizacion.jrxml";
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
    
    public void guardarCotizacionPDF(int id, String nombreCliente) {
        try {
            InputStream inputStream = null;
            JasperPrint jasperPrint = null;
            Conexion bd = new Conexion();

            String destino = "C:\\correo\\" + id + "-" + nombreCliente + ".pdf";

            try {
                inputStream = new FileInputStream("C:\\report\\Cotizacion\\Cotizacion.jrxml");
            } catch (FileNotFoundException ex) {
                JOptionPane.showMessageDialog(null, "No se encuentra el archivo jasper report " + ex.getMessage());
            }

            try {

                Map Parametro = new HashMap();
                Parametro.put("id", id);
                JasperDesign jasperDesign = JRXmlLoader.load(inputStream);
                JasperReport jasperReport = JasperCompileManager.compileReport(jasperDesign);
                jasperPrint = JasperFillManager.fillReport(jasperReport, Parametro, bd.abrirConexion());
                //JasperPrintManager.printReport(jasperPrint, true);//aagrege a true este ultimo para imprimir directamente en la impresora predeterminada
                //JasperViewer vista=new JasperViewer(jasperPrint,false);
                //vista.setTitle("REPORTE DE RESULTADO DE PRUEBA RAPIDA - COVID 19");
                //vista.setVisible(true);
                JRExporter exporter = new JRPdfExporter();
                exporter.setParameter(JRExporterParameter.JASPER_PRINT, jasperPrint);
                exporter.setParameter(JRExporterParameter.OUTPUT_FILE_NAME, destino);
                //JasperExportManager.exportReportToPdfFile( jasperPrint, "C:\\reportes/reporte.pdf");
                exporter.exportReport();

            } catch (JRException e) {
                //JOptionPane.showMessageDialog(null, "Error : "+e, "Mensaje de Sistema", JOptionPane.ERROR_MESSAGE);
                System.out.println("Error JRException : "+e);
            }
        } catch (Exception e) {
            //JOptionPane.showMessageDialog(null, "Error : "+e, "Mensaje de Sistema", JOptionPane.ERROR_MESSAGE);
            System.out.println("Error Exception : "+e);
        }

    }
    
    public byte[] imprimirReporteVenta(ByteArrayOutputStream outputStream, Map parametros) {
        JRPdfExporter exporter = new JRPdfExporter();
        try {
            
            String reportLocation = "C:\\report\\ReporteVenta\\"
                    + "reporteVenta.jrxml";
              System.out.println(reportLocation);        
              
            InputStream jrxmlInput = new FileInputStream(new File(reportLocation));
            JasperDesign design = JRXmlLoader.load(jrxmlInput);
            JasperReport jasperReport = JasperCompileManager.compileReport(design);
            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parametros, conexion.abrirConexion());
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
    public byte[] imprimirReporteProductosVendidos(ByteArrayOutputStream outputStream, Map parametros) {
        JRPdfExporter exporter = new JRPdfExporter();
        try {
            
            String reportLocation = "C:\\report\\ReporteProductos\\"
                    + "reporteProductosVendidos.jrxml";
              System.out.println(reportLocation);        
              
            InputStream jrxmlInput = new FileInputStream(new File(reportLocation));
            JasperDesign design = JRXmlLoader.load(jrxmlInput);
            JasperReport jasperReport = JasperCompileManager.compileReport(design);
            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parametros, conexion.abrirConexion());
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
    public byte[] imprimirReporteRepuestosVendidos(ByteArrayOutputStream outputStream, Map parametros) {
        JRPdfExporter exporter = new JRPdfExporter();
        try {
            
            String reportLocation = "C:\\report\\ReporteRepuestos\\"
                    + "reporteRepuestos.jrxml";
              System.out.println(reportLocation);        
              
            InputStream jrxmlInput = new FileInputStream(new File(reportLocation));
            JasperDesign design = JRXmlLoader.load(jrxmlInput);
            JasperReport jasperReport = JasperCompileManager.compileReport(design);
            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parametros, conexion.abrirConexion());
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
    public byte[] imprimirReporteServiciosVendidos(ByteArrayOutputStream outputStream, Map parametros) {
        JRPdfExporter exporter = new JRPdfExporter();
        try {
            
            String reportLocation = "C:\\report\\ReporteServicios\\"
                    + "reporteServicios.jrxml";
              System.out.println(reportLocation);        
              
            InputStream jrxmlInput = new FileInputStream(new File(reportLocation));
            JasperDesign design = JRXmlLoader.load(jrxmlInput);
            JasperReport jasperReport = JasperCompileManager.compileReport(design);
            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parametros, conexion.abrirConexion());
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
    public byte[] imprimirReporteAtencionesTecnico(ByteArrayOutputStream outputStream, Map parametros) {
        JRPdfExporter exporter = new JRPdfExporter();
        try {
            
            String reportLocation = "C:\\report\\ReporteAtenciones\\"
                    + "reporteAtenciones.jrxml";
              System.out.println(reportLocation);        
              
            InputStream jrxmlInput = new FileInputStream(new File(reportLocation));
            JasperDesign design = JRXmlLoader.load(jrxmlInput);
            JasperReport jasperReport = JasperCompileManager.compileReport(design);
            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parametros, conexion.abrirConexion());
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
