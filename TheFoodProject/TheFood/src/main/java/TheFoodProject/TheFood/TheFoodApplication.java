package TheFoodProject.TheFood;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.amqp.RabbitAutoConfiguration;
import org.springframework.boot.autoconfigure.data.elasticsearch.ElasticsearchDataAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class , DataSourceAutoConfiguration.class, DataSourceTransactionManagerAutoConfiguration.class, RabbitAutoConfiguration.class, ElasticsearchDataAutoConfiguration.class})
public class TheFoodApplication {
	public static void main(String[] args) {
		SpringApplication.run(TheFoodApplication.class, args);
	}

}

