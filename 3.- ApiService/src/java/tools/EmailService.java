package tools;
 
import java.io.File;
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
 
	public boolean sendEmail(File[] destino,String correo,String empresa){
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
                        texto.setText("Ficha de Resultados generados por el Policlinico Virgen de Guadalupe para : "+ empresa.toUpperCase());
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
                        message.setSubject("Ficha de Resultados generados por el Policlinico Virgen de Guadalupe S.A.C");
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
 
}