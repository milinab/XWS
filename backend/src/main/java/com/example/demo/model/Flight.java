package com.example.demo.model;

import com.example.demo.enums.FlightStatus;
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
    private String departurePlace;
    private String arrivalPlace;
    private Float price;
    private Integer maxCapacity;

    private FlightStatus status;

    public Flight(Integer maxCapacity) {
        this.maxCapacity = maxCapacity;
    }

//    public Flight(String id, Integer maxCapacity) {
//        this.id = id;
//        this.maxCapacity = maxCapacity;
//    }

    public Flight(String departurePlace, Integer maxCapacity) {
        this.departurePlace = departurePlace;
        this.maxCapacity = maxCapacity;
    }
    public Flight(Date departureDate, Date arrivalDate, String departurePlace, String arrivalPlace, Float price, Integer maxCapacity) {
        this.departureDate = departureDate;
        this.arrivalDate = arrivalDate;
        this.departurePlace = departurePlace;
        this.arrivalPlace = arrivalPlace;
        this.price = price;
        this.maxCapacity = maxCapacity;
    }

    public Flight(String id, Date departureDate, Date arrivalDate, String departurePlace, String arrivalPlace, Float price, Integer maxCapacity) {
        this.id = id;
        this.departureDate = departureDate;
        this.arrivalDate = arrivalDate;
        this.departurePlace = departurePlace;
        this.arrivalPlace = arrivalPlace;
        this.price = price;
        this.maxCapacity = maxCapacity;
    }

    public Flight(String id) {
        this.id = id;
    }

    public Flight() {
    }
//    public Flight(String departurePlace, String arrivalPlace) {
//        this.departurePlace = departurePlace;
//        this.arrivalPlace = arrivalPlace;
//    }



    public Flight(String departurePlace, String arrivalPlace, Date departureDate, Date arrivalDate) {
        this.departurePlace = departurePlace;
        this.arrivalPlace = arrivalPlace;
        this.departureDate = departureDate;
        this.arrivalDate = arrivalDate;

    }



}