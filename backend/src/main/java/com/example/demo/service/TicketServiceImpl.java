package com.example.demo.service;

import com.example.demo.model.Ticket;
import com.example.demo.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TicketServiceImpl implements TicketService{

    private TicketRepository ticketRepository;

    @Autowired
    public TicketServiceImpl(TicketRepository ticketRepository){
        this.ticketRepository = ticketRepository;
    }

    @Override
    public Ticket save(Ticket ticket){
        return this.ticketRepository.save(ticket);
    }
    @Override
    public List<Ticket> createMultipleTicket(List<Ticket> ticket){
        List<Ticket>savedTicket = new ArrayList<>();
        for(Ticket ticket1 : ticket){
            savedTicket.add(ticketRepository.save(ticket1));
        }
        return savedTicket;
    }

    @Override
    public List<Ticket> findAll(){ return ticketRepository.findAll();}
}
