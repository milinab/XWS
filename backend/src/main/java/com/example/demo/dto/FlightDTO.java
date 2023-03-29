package com.example.demo.dto;

import com.example.demo.model.Flight;
import com.mongodb.internal.connection.Time;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FlightDTO {
    private String id;
    private Date departureDate;
    private Date arrivalDate;
    private Time departureTime;
    private Time arrivalTime;
    private String departurePlace;
    private String arrivalPlace;
    private Float price;
    private Integer maxCapacity;

    public FlightDTO(Flight flight){
        this(flight.getId(), flight.getDepartureDate(), flight.getArrivalDate(), flight.getDepartureTime(), flight.getArrivalTime(), flight.getDeparturePlace(), flight.getArrivalPlace(), flight.getPrice(), flight.getMaxCapacity());
    }
}
