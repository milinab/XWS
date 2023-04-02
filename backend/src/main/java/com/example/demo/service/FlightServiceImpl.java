package com.example.demo.service;

import com.example.demo.enums.FlightStatus;
import com.example.demo.model.Flight;
import com.example.demo.repository.FlightRepository;
import com.example.demo.utils.DateOperations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class FlightServiceImpl implements FlightService{
    private FlightRepository flightRepository;
    private DateOperations dateOperations;

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
        Date departureDate = flight.getDepartureDate();
        LocalDate localDepartureDate = departureDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        Date arrivalDate = flight.getArrivalDate();
        LocalDate localArrivalDate = arrivalDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        if(localDepartureDate.isAfter(localArrivalDate) || localDepartureDate.isBefore(LocalDate.now()) || localArrivalDate.isBefore(LocalDate.now())) {
            return null;
        } else if(localDepartureDate.isEqual(localArrivalDate) && flight.getArrivalTime().isBefore(flight.getDepartureTime())) {
            return null;
        } else {
            flight.setStatus(FlightStatus.SCHEDULED);
            return flightRepository.save(flight);
        }
    }


public List<Flight> searchFlights(String departurePlace, String arrivalPlace, Date departureDate, Date arrivalDate, int numPassengers) {
    List<Flight> allFlights = findAll();
    List<Flight> matchingFlights = new ArrayList<>();

    for (Flight flight : allFlights) {
        System.out.println(flight.getDepartureDate());
        if (flight.getDeparturePlace() != null && flight.getDeparturePlace().equalsIgnoreCase(departurePlace)
            && flight.getArrivalPlace() != null && flight.getArrivalPlace().equalsIgnoreCase(arrivalPlace)
            && dateOperations.isSameDate(flight.getDepartureDate(), departureDate)
            && dateOperations.isSameDate(flight.getArrivalDate(), arrivalDate)
                && flight.getMaxCapacity() >= numPassengers) {
            matchingFlights.add(flight);
        }
    }

    return matchingFlights;
}


    @Override
    public Boolean cancelFlight(String id) {
        Optional<Flight> flight = flightRepository.findById(id);
        Date departureDate = flight.get().getDepartureDate();
        LocalDate localDepartureDate = departureDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        if(localDepartureDate.isBefore(LocalDate.now()) || flight.get().getStatus().equals(FlightStatus.CANCELLED))
        {
            return false;
        }
        flight.get().setStatus(FlightStatus.CANCELLED);
        flightRepository.save(flight.get());
        return true;
    }
}
