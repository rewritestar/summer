package TheFoodProject.TheFood.Controller;

import org.apache.commons.mail.HtmlEmail;

public class MailUtil {

    public void sendMail(String useremail, String tempPw) throws Exception{

        //mail server 설정
        String charSet = "utf-8";
        String hostSMTP = "smtp.gmail.com";
        String hostSMTPid = "sujinjeon587";
        String hostSMTPpw = "hera17451745^^";

        //보내는 사람
        String fromEmail = "sujinjeon587@gmail.com";
        String fromName = "전수진";

        String subject = "[The Food] 임시 비밀번호 발급 안내";
        String msg = "";

        msg += "회원님의 임시 비밀번호 발급 드립니다. 로그인 후 비밀번호를 재설정 해주세요";
        msg += tempPw;

        String mailRecipient = useremail;

        try{
            HtmlEmail mail = new HtmlEmail();
            mail.setDebug(true);
            mail.setCharset(charSet);
            mail.setSSLOnConnect(true);
            mail.setHostName(hostSMTP);
            mail.setSmtpPort(587);
            mail.setAuthentication(hostSMTPid, hostSMTPpw);
            mail.setStartTLSEnabled(true);
            mail.addTo(mailRecipient, charSet);
            mail.setFrom(fromEmail, fromName, charSet);
            mail.setSubject(subject);
            mail.setHtmlMsg(msg);
            mail.send();
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }
}
