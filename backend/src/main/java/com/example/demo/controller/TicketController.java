package com.example.demo.controller;

import com.example.demo.dto.TicketDTO;
import com.example.demo.model.Ticket;
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

    @Autowired
    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
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

}

