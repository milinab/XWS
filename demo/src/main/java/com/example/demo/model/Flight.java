package com.example.demo.model;

import com.mongodb.internal.connection.Time;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data //geteri, seteri, konstruktori...
@Document // za mongo db
public class Flight {
    @Id
    private String id;
    private Date departureDate;
    private Date arrivalDate;
    private Time departureTime;
    private Time arrivalTime;
    private String departurePlace;
    private String arrivalPlace;
    private Float price;
    private Integer maxCapacity;

    public Flight(Integer maxCapacity) {
        this.maxCapacity = maxCapacity;
    }
}