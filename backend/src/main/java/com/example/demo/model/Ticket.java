package com.example.demo.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@Data
@Document
public class Ticket {
    @Id
    private String id;
    private Flight flight;
    private AppUser appUser;

    public Ticket(Flight flight, AppUser appUser) {
        this.flight = flight;
        this.appUser = appUser;
    }
}
