package com.example.demo.service;

import com.example.demo.model.Flight;
import com.example.demo.model.Ticket;
import com.example.demo.repository.FlightRepository;
import com.example.demo.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TicketServiceImpl implements TicketService{

    private TicketRepository ticketRepository;
    private FlightRepository flightRepository;

    @Autowired
    public TicketServiceImpl(TicketRepository ticketRepository, FlightRepository flightRepository){
        this.ticketRepository = ticketRepository;
        this.flightRepository = flightRepository;
    }

    @Override
    public Ticket save(Ticket ticket){
        return this.ticketRepository.save(ticket);
    }
    @Override
    public List<Ticket> createMultipleTicket(List<Ticket> ticket){
        List<Ticket>savedTicket = new ArrayList<>();
        //Flight flight = new Flight();
        //flight = flightRepository.findById(ticket.get(0).getFlightId());
        for(Ticket ticket1 : ticket){
            savedTicket.add(ticketRepository.save(ticket1));
        }
        return savedTicket;
    }

    @Override
    public List<Ticket> findByFlightId(String flightId) {
        return ticketRepository.findByFlightId(flightId);
    }

    @Override
    public List<Ticket> findAll(){ return ticketRepository.findAll();}

}
