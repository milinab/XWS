package com.example.demo.model;

import com.example.demo.enums.TicketStatus;
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
    private TicketStatus status;


    public Ticket(Flight flight, AppUser appUser, TicketStatus ticketStatus) {
        this.flight = flight;
        this.appUser = appUser;
        this.status = ticketStatus;
    }
}
