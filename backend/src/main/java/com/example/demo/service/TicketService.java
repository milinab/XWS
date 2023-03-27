package com.example.demo.service;

import com.example.demo.model.Ticket;

import java.util.List;

public interface TicketService {
    Ticket save(Ticket ticket);
    List<Ticket> findAll();
}
