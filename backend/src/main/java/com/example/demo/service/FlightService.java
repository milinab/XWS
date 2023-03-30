package com.example.demo.service;

import com.example.demo.model.Flight;

import java.util.List;

public interface FlightService {
    Flight findOne(String id);
    List<Flight> findAll();
}
