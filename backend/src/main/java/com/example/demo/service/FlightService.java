package com.example.demo.service;

import com.example.demo.model.Flight;

import java.util.Date;
import java.util.List;

public interface FlightService {
    Flight save(Flight flight);
    Flight findOne(String id);
    List<Flight> findAll();
    public List<Flight> searchFlights(String departurePlace, String arrivalPlace,  Date departureDate, Date arrivalDate, int numPassengers);
    Boolean cancelFlight(String id);
}
