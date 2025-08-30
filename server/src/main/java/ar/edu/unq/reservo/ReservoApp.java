package ar.edu.unq.epersgeist;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
public class ReservoApp {

    public static void main(String[] args) {
        SpringApplication.run(ReservoApp.class, args);
    }
}