package TheFoodProject.TheFood.JasyptApplicationTests;

import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.springframework.boot.test.context.SpringBootTest;
import org.testng.annotations.Test;

@SpringBootTest
public class test {
    @Test
    void contextLoads() {
    }

    @Test
    void jasypt() {
        String datasource_password = "123456";
        String mail_password = "hera1745^^";

        System.out.println(jasyptEncoding(datasource_password));
        System.out.println(jasyptEncoding(mail_password));
    }

    public String jasyptEncoding(String value) {

        String key = "my_jasypt_key";
        StandardPBEStringEncryptor pbeEnc = new StandardPBEStringEncryptor();
        pbeEnc.setAlgorithm("PBEWithMD5AndDES");
        pbeEnc.setPassword(key);
        return pbeEnc.encrypt(value);
    }
}

