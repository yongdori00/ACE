package TeamAce.AceProject;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

import javax.persistence.EntityManager;

@EnableJpaAuditing
@EnableScheduling
@SpringBootApplication
public class AceProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(AceProjectApplication.class, args);
	}

	@Bean
	JPAQueryFactory jpaQueryFactory(EntityManager em) {
		return new JPAQueryFactory(em);
	}
}
