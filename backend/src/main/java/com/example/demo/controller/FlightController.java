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

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

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

    @GetMapping (value = "/all")
    public ResponseEntity<List<FlightDTO>>GetAllFlights(){
        List<Flight> flightList = flightService.findAll();
        List<FlightDTO> flightDTOS = new ArrayList<>();
        for(Flight flight : flightList){
            flightDTOS.add(new FlightDTO(flight));
        }
        return new ResponseEntity<>(flightDTOS, HttpStatus.OK);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Flight> createFlight(@RequestBody Flight flight) {
        Flight newFlight = null;
        try {
            newFlight = flightService.save(flight);
            if(newFlight == null) {
                return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
            }
            return new ResponseEntity<Flight>(HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<Flight>(newFlight, HttpStatus.CONFLICT);
        }
    }

    @PutMapping(consumes = "application/json", value = "/cancel/{id}")
    public ResponseEntity<Flight> cancelFlight(@PathVariable("id") String id) {
        Boolean flight = flightService.cancelFlight(id);
        if (flight== false){
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/search")
    public List<Flight> searchFlights(
            @RequestParam("departurePlace") String departurePlace,
            @RequestParam("arrivalPlace") String arrivalPlace,
            @RequestParam("departureDate") String departureDateString,
            @RequestParam("arrivalDate") String arrivalDateString,
            @RequestParam("numPassengers") int numPassengers

    ) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        try {
            Date departureDate = formatter.parse(departureDateString);
            Date arrivalDate = formatter.parse(arrivalDateString);
            System.out.println(departureDate.toString());

            return flightService.searchFlights(departurePlace, arrivalPlace, departureDate, arrivalDate, numPassengers);

        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }
}

