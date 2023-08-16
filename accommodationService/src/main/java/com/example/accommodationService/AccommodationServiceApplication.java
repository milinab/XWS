package com.example.accommodationService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication

	public class AccommodationServiceApplication {

	

	public static void main(String[] args) {
		SpringApplication.run(AccommodationServiceApplication.class, args);
		System.out.println("APP - MAIN --------------------");
	}

}
