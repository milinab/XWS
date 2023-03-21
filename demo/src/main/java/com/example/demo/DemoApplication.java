package com.example.demo;

import com.example.demo.model.AppUser;
import com.example.demo.model.Flight;
import com.example.demo.repository.AppUserRepository;
import com.example.demo.repository.FlightRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class DemoApplication {
	private final FlightRepository flightRepository;

	public DemoApplication(FlightRepository flightRepository) {
		this.flightRepository = flightRepository;
	}

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Bean
	CommandLineRunner runner(FlightRepository repository) {
		return args -> {
		Flight flight = new Flight(250);
		repository.insert(flight);
		};

	}

}

