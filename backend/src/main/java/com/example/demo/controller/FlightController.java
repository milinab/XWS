package com.example.demo.controller;

import com.example.demo.dto.FlightDTO;
import com.example.demo.model.Flight;
import com.example.demo.model.Ticket;
import com.example.demo.service.FlightService;
import com.example.demo.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "api/flights")

public class FlightController {
    private FlightService flightService;
    @Autowired
    public FlightController(FlightService flightService){this.flightService = flightService;}

    @GetMapping (value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<FlightDTO> getFlight(@PathVariable("id") String id){
        Flight flight = flightService.findOne(id);
        if(flight == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        FlightDTO flightDTO = new FlightDTO(flight);
        return new ResponseEntity<>(flightDTO, HttpStatus.OK);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Flight> createTicket(@RequestBody Flight flight) {
        Flight savedFlight = null;
        try {
            savedFlight = flightService.save(flight);
            if (savedFlight == null) {
                System.out.println("aaa");
                return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
            }
            return new ResponseEntity<Flight>(HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<Flight>(savedFlight, HttpStatus.CONFLICT);
        }
    }

    @GetMapping (value = "/all")
    public ResponseEntity<List<FlightDTO>>GetAllFlights(){
        List<Flight> flightList = flightService.findAll();
        List<FlightDTO> flightDTOS = new ArrayList<>();
        for(Flight flight : flightList){
            flightDTOS.add(new FlightDTO(flight));
        }
        System.out.println(flightDTOS);
        return new ResponseEntity<>(flightDTOS, HttpStatus.OK);
    }
}

