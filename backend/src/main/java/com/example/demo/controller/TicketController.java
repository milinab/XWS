package com.example.demo.controller;

import com.example.demo.dto.TicketDTO;
import com.example.demo.model.Flight;
import com.example.demo.model.Ticket;
import com.example.demo.service.FlightService;
import com.example.demo.service.TicketService;
import jakarta.annotation.security.PermitAll;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "api/tickets")

public class TicketController {
    private TicketService ticketService;
    private FlightService flightService;

    @Autowired
    public TicketController(TicketService ticketService, FlightService flightService) {
        this.ticketService = ticketService;
        this.flightService = flightService;
    }

    //  @PreAuthorize("")
    @GetMapping(value = "/all")
    public ResponseEntity<List<TicketDTO>> GetAllTickets() {
        List<Ticket> ticketList = ticketService.findAll();
        List<TicketDTO> ticketDTOS = new ArrayList<>();
        for (Ticket ticket : ticketList) {
            ticketDTOS.add(new TicketDTO(ticket));
        }
        System.out.println(ticketDTOS);
        return new ResponseEntity<>(ticketDTOS, HttpStatus.OK);
    }

    @GetMapping("/tickets/appUserId/{appUserId}")
    public ResponseEntity<List<Ticket>> getTicketsByAppUserId(@PathVariable String appUserId) {
        List<Ticket> tickets = ticketService.getTicketsByAppUserId(appUserId);
        return new ResponseEntity<>(tickets, HttpStatus.OK);
    }


    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Ticket> createTicket(@RequestBody Ticket ticket) {
        Ticket savedTicket = null;
        try {
            savedTicket = ticketService.save(ticket);
            if (savedTicket == null) {
                System.out.println("aaa");
                return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
            }
            return new ResponseEntity<Ticket>(HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<Ticket>(savedTicket, HttpStatus.CONFLICT);
        }
    }

    @PostMapping(value ="/multiple",  consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Ticket>> createMultipleTicket(@RequestBody Ticket ticket) {
        Flight flight = flightService.findOne(ticket.getFlightId());
        if (flight == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<Ticket> existingTickets = ticketService.findByFlightId(ticket.getFlightId());
        int totalTickets = existingTickets.size();
        int remainingCapacity = flight.getMaxCapacity() - totalTickets;
        if (ticket.getNumberOfTickets() > remainingCapacity) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        List<Ticket> ticketList = new ArrayList<>();
        for (int i = 0; i < ticket.getNumberOfTickets(); i++) {
            Ticket newTicket = new Ticket();
            newTicket.setAppUserId(ticket.getAppUserId());
            newTicket.setFlightId(ticket.getFlightId());
            newTicket.setNumberOfTickets(ticket.getNumberOfTickets());
            ticketList.add(ticketService.save(newTicket));
        }
        return new ResponseEntity<>(ticketList, HttpStatus.CREATED);
    }

    @GetMapping("/remaining/{flightId}")
    public ResponseEntity<Integer> getRemainingNumber(@PathVariable String flightId) {
        Flight flight = flightService.findOne(flightId);
        List<Ticket> existingTickets = ticketService.findByFlightId(flightId);
        int totalTickets = existingTickets.size();
        int remainingCapacity = flight.getMaxCapacity() - totalTickets;
        return new ResponseEntity<>(remainingCapacity, HttpStatus.OK);
    }
}

