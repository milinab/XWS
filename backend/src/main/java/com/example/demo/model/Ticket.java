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
    private String flightId;
    private String appUserId;
    private TicketStatus status;
    private Integer numberOfTickets;


    public Ticket(String flight, String appUser, TicketStatus ticketStatus, Integer numberOfTickets) {
        this.flightId = flight;
        this.appUserId = appUser;
        this.status = ticketStatus;
        this.numberOfTickets = numberOfTickets;
    }
    public Ticket(String flight, TicketStatus ticketStatus, Integer numberOfTickets) {
        this.flightId = flight;
        this.status = ticketStatus;
        this.numberOfTickets = numberOfTickets;
    }
}
