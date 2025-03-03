package com.strivesync.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
 * Main application class for the StriveSync API.
 * This class serves as the entry point for the Spring Boot application.
 */
@SpringBootApplication
@EnableJpaAuditing
public class StriveSyncApplication {

    public static void main(String[] args) {
        SpringApplication.run(StriveSyncApplication.class, args);
    }
} 