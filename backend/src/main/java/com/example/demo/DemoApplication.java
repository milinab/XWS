package com.example.demo;

import com.example.demo.model.AppUser;
import com.example.demo.model.Flight;
import com.example.demo.model.Ticket;
import com.example.demo.repository.AppUserRepository;
import com.example.demo.repository.FlightRepository;
import com.example.demo.repository.TicketRepository;
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
	CommandLineRunner runner(FlightRepository repository, AppUserRepository appUserRepository, TicketRepository ticketRepository) {
		return args -> {
			Flight flight = new Flight(250);
			AppUser appUser = new AppUser("kia", "Aleksa", "Ignjatovic", "aleksaignjatovic20@gmail.com", "123");
			Ticket ticket = new Ticket(flight, appUser);
			repository.insert(flight);
			ticketRepository.insert(ticket);
			appUserRepository.insert(appUser);
		};

	}

}