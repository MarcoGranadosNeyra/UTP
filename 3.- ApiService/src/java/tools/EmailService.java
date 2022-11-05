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
            	properties.put("mail.smtp.host", "smtp.serviciodecorreo.es");
		properties.put("mail.smtp.starttls.enable", "true");
		properties.put("mail.smtp.port",465);
                properties.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
		properties.put("mail.smtp.mail.sender","drvictorcuya@clinicalurin.com");
		properties.put("mail.smtp.user", "drvictorcuya@clinicalurin.com");
		properties.put("mail.smtp.auth", "true");
                */
         
            	properties.put("mail.smtp.host", "smtp.office365.com");
		properties.put("mail.smtp.starttls.enable", "true");
		properties.put("mail.smtp.port",587 );
                properties.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
		properties.put("mail.smtp.mail.sender","innovautp@outlook.com");
		properties.put("mail.smtp.user", "innovautp@outlook.com");
		properties.put("mail.smtp.auth", "true");
 
		session = Session.getDefaultInstance(properties);
	}
 
	public boolean sendEmail(File[] destino,String correo,String nombreCliente){
                boolean result=false;
		init();
		try{

			MimeMessage message = new MimeMessage(session);
			message.setFrom(new InternetAddress((String)properties.get("mail.smtp.mail.sender")));
                       
                        message.addRecipients(Message.RecipientType.TO,InternetAddress.parse(correo));

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

                        message.setSubject("Cotizacion generada - INNOVA UTP S.A.C");
                        message.setContent(multiParte);

                        // Se envia el correo.
                        Transport t = session.getTransport("smtp");
                        t.connect("innovautp@outlook.com", "Innov@utp2022");
                        t.sendMessage(message, message.getAllRecipients());
                        message.setContent(multiParte);
                        t.close();
                        
                        result=true;
		}catch (MessagingException me){
                        System.out.println(me);
			result=false;
		}
		return result;
	}
}