package com.ffhs;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

/**
 * Main Springboot class
 * Starts the backend application
 */
@SpringBootApplication
@RestController
public class ToBackendApplication {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		SpringApplication.run(ToBackendApplication.class, args);
	}
}
