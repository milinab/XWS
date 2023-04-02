package com.example.demo.repository;

import com.example.demo.controller.TicketController;
import com.example.demo.model.Ticket;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TicketRepository extends MongoRepository<Ticket, String> {
    public List<Ticket> findByFlightId(String flightId);
    List<Ticket> findByAppUserId(String appUserId);
}
