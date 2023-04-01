package com.example.demo.service;

import com.example.demo.model.Flight;

import java.util.Date;
import java.util.List;

public interface FlightService {
    Flight save(Flight flight);
    Flight findOne(String id);
    List<Flight> findAll();
    List<Flight> searchFlights(String departurePlace, String arrivalPlace);
}
