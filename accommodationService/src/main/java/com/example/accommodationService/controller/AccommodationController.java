package com.example.accommodationService.controller;

import com.example.accommodationService.model.Accommodation;
import com.example.accommodationService.service.AccommodationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "api/accommodation")
public class AccommodationController {

    @Autowired
    private AccommodationService accommodationService;

    private AccommodationController(AccommodationService accommodationService){
        this.accommodationService = accommodationService;

    }
    @PostMapping("/create")
    public ResponseEntity<?> createAccommodation(@RequestBody Accommodation accommodation) {
        try {
            Accommodation newAccommodation = accommodationService.createAccommodation(accommodation);
            if (newAccommodation == null) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(newAccommodation, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace(); // Consider logging the exception instead
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
