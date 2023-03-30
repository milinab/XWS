package com.example.demo.service;

import com.example.demo.model.Flight;
import com.example.demo.model.Ticket;

import java.util.List;

public interface FlightService {

    Flight save(Flight flight);
    Flight findOne(String id);
    List<Flight> findAll();
}
