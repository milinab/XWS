package com.example.demo.service;

import com.example.demo.model.Ticket;

import java.util.ArrayList;
import java.util.List;

public interface TicketService {
    Ticket save(Ticket ticket);
    List<Ticket> findAll();
    List<Ticket> createMultipleTicket(List<Ticket> ticket);
}
