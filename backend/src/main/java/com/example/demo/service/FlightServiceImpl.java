package com.example.demo.service;

import com.example.demo.model.Flight;
import com.example.demo.model.Ticket;
import com.example.demo.repository.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FlightServiceImpl implements FlightService{
    private FlightRepository flightRepository;

    @Autowired
    public FlightServiceImpl(FlightRepository flightRepository) {this.flightRepository  = flightRepository;}

    @Override
    public Flight findOne(String id) {
        Optional<Flight> flight = flightRepository.findById(id);
        if(flight.isPresent()){
            return flight.get();
        }
        return null;
    }

    @Override
    public List<Flight> findAll() {
        return flightRepository.findAll();
    }

    @Override
    public Flight save(Flight flight){
        return this.flightRepository.save(flight);
    }


}
