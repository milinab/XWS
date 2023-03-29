package com.example.demo.controller;

import com.example.demo.dto.TicketDTO;
import com.example.demo.model.Ticket;
import com.example.demo.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "api/tickets")

public class TicketController {
    private TicketService ticketService;

    @Autowired
    public TicketController(TicketService ticketService){
        this.ticketService = ticketService;
    }

    @GetMapping(value = "/all")
    public ResponseEntity<List<TicketDTO>>GetAllTickets(){
        List<Ticket>ticketList = ticketService.findAll();
        List<TicketDTO>ticketDTOS = new ArrayList<>();
        for(Ticket ticket : ticketList){
            ticketDTOS.add(new TicketDTO(ticket));
        }
        System.out.println(ticketDTOS);
        return new ResponseEntity<>(ticketDTOS, HttpStatus.OK);
    }


    @PostMapping(consumes = "application/json")
    public ResponseEntity<TicketDTO> saveTicket(@RequestBody TicketDTO ticketDTO){
        Ticket ticket = new Ticket();
        ticket.setFlight(ticketDTO.getFlight());
        ticket.setAppUser(ticketDTO.getAppUser());
        ticket.setStatus(ticketDTO.getStatus());
        ticket.setNumberOfTickets(ticketDTO.getNumberOfTickets());
        return new ResponseEntity<>(new TicketDTO(ticket), HttpStatus.CREATED );
    }



}
