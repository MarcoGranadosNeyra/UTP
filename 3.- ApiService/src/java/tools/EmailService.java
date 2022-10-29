package tools;
 
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Properties;
import javax.activation.DataHandler;
import javax.activation.FileDataSource;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;

import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
 
public class EmailService {
	private final Properties properties = new Properties();
	
	private String password;
 
	private Session session;
 
	private void init() {
            /*
		properties.put("mail.smtp.host", "smtp.gmail.com");
		properties.put("mail.smtp.starttls.enable", "true");
		properties.put("mail.smtp.port",587);
                properties.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
		properties.put("mail.smtp.mail.sender","mgranados@uniflex.com.pe");
		properties.put("mail.smtp.user", "mgranados@uniflex.com.pe");
		properties.put("mail.smtp.auth", "true");
                */
         
            	properties.put("mail.smtp.host", "smtp.serviciodecorreo.es");
		properties.put("mail.smtp.starttls.enable", "true");
		properties.put("mail.smtp.port",465);
                properties.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
		properties.put("mail.smtp.mail.sender","drvictorcuya@clinicalurin.com");
		properties.put("mail.smtp.user", "drvictorcuya@clinicalurin.com");
		properties.put("mail.smtp.auth", "true");
 
		session = Session.getDefaultInstance(properties);
	}
 
	public boolean sendEmail(File[] destino,String correo,String nombreCliente){
                boolean result=false;
		init();
		try{

			MimeMessage message = new MimeMessage(session);
			message.setFrom(new InternetAddress((String)properties.get("mail.smtp.mail.sender")));
                       
			//message.addRecipient(Message.RecipientType.TO, new InternetAddress("marco.granados.neyra@gmail.com"));
                        //message.addRecipient(Message.RecipientType.TO, new InternetAddress(correo));
                        message.addRecipients(Message.RecipientType.TO,InternetAddress.parse(correo));
			//message.setSubject("ESTO ES UN CORREO");
			//message.setText("ESTO ES EL TEXTO DEL CORREO");

                        // Se compone la parte del texto
                        BodyPart texto = new MimeBodyPart();
                        texto.setText("La empresa Innova UTP adjunta cotizacion de su equipo, a la espera de su respuesta");
                        List<BodyPart> bp = new LinkedList<BodyPart>();
                                                
                        for(int i=0;i<=destino.length-1;i++)
                        {
                            BodyPart adjunto = new MimeBodyPart();
                            adjunto.setDataHandler(new DataHandler(new FileDataSource(destino[i].getAbsoluteFile())));
                            adjunto.setFileName(destino[i].getName());
                            bp.add(adjunto);//<----------------añadimos el elemento a la lista
                        }
                        
                        // Una MultiParte para agrupar texto e imagen.
                        MimeMultipart multiParte = new MimeMultipart();
                        multiParte.addBodyPart(texto);

                        Iterator it = bp.iterator();//<------------la iteramos
                        while(it.hasNext())//<----------------la recorremos
                        {
                           BodyPart attach =(BodyPart)it.next();//<------------obtenemos el objeto
                           multiParte.addBodyPart(attach);//<-----------------finalmente lo añadimos al mensaje
                        }
                         

                                    // Se compone el correo, dando to, from, subject y el
                        // contenido.
                        //MimeMessage message = new MimeMessage(session);
                        //message.setFrom(new InternetAddress("mail.smtp.mail.sender"));
                        /*message.addRecipient(
                            Message.RecipientType.TO,
                            new InternetAddress("marco.granados.neyra@gmail.com"));
                        */
                        message.setSubject("Cotizacion generada - INNOVA UTP S.A.C");
                        message.setContent(multiParte);

                        // Se envia el correo.
                        Transport t = session.getTransport("smtp");
                        // t.connect((String)properties.get("drvictorcuya@clinicalurin.com"), "Guadalupe76");
                        t.connect("drvictorcuya@clinicalurin.com", "Guadalupe76");
                        t.sendMessage(message, message.getAllRecipients());
                        message.setContent(multiParte);
                        t.close();
                        
                        /*
			Transport t = session.getTransport("smtp");
			//t.connect((String)properties.get("mgranados@uniflex.com.pe"), "$gN923667760100");
                        t.connect((String)properties.get("drvictorcuya@clinicalurin.com"), "Guadalupe76");
			t.sendMessage(message, message.getAllRecipients());
                        message.setContent(multiParte);
			t.close();
                        */
                        result=true;
		}catch (MessagingException me){
                        //Aqui se deberia o mostrar un mensaje de error o en lugar
                        //de no hacer nada con la excepcion, lanzarla para que el modulo
                        //superior la capture y avise al usuario con un popup, por ejemplo.
                        System.out.println(me);
			result=false;
		}
		return result;
	}
        /*
        void enviarCorreo(int id,String cliente,String correo){
            try {

                if (enviarPDFporCorreo(id,cliente,correo)) {

                    JOptionPane.showMessageDialog(null,"Correo Enviado a "+cliente,"Mensaje de sistema",JOptionPane.INFORMATION_MESSAGE);
                } else {
                    JOptionPane.showMessageDialog(null,"Error al Enviar Correo a "+cliente,"Mensaje de sistema",JOptionPane.ERROR_MESSAGE);
                }

            } catch (Exception e) {
                JOptionPane.showMessageDialog(null,"Error : "+e,"Mensaje de sistema",JOptionPane.ERROR_MESSAGE);
            }
        }

        void eliminarCarpeta(File pArchivo) {
            if (!pArchivo.exists()) { return; }

            if (pArchivo.isDirectory()) {
                for (File f : pArchivo.listFiles()) {
                    eliminarCarpeta(f);  }
            }
            pArchivo.delete();
        } 

        public boolean enviarPDFporCorreo(int id,String cliente,String correo){
            File directorio = new File("C:\\correos\\cotizacion\\");
            eliminarCarpeta(directorio);
            crearCarpeta();
            generarDocumentoPDF(id,cliente);
            boolean result=adjuntarPDF(correo);
            return result;
        }
        
        void crearCarpeta(){

            Path path = Paths.get("C:\\correos\\cotizacion\\");
             try {
                Files.createDirectories(path);
            } catch (Exception e) {
                System.out.println(e);
            }
        }

        void generarDocumentoPDF(int id,String nombrePaciente){

            Reporte rp = new Reporte();
            rp.guardarCotizacionPDF(id, nombrePaciente);

        }

        public boolean adjuntarPDF(String correo){

            File directorio = new File("C:\\correos\\cotizacion\\");
            File[] adjuntos = directorio.listFiles();

            //gui.tools.EmailSenderService enviarCorreo = new gui.tools.EmailSenderService();
            boolean result=this.sendEmail(adjuntos,correo);
            return result;
        }
        */
}