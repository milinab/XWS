package com.example.demo.controller;

import com.example.demo.dto.FlightDTO;
import com.example.demo.model.Flight;
import com.example.demo.service.FlightService;
import com.example.demo.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}

