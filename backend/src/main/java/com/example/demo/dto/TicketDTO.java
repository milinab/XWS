package com.example.demo.dto;

import com.example.demo.enums.TicketStatus;
import com.example.demo.model.AppUser;
import com.example.demo.model.Flight;
import com.example.demo.model.Ticket;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TicketDTO {
    private String id;
    private Flight flight;
    private AppUser appUser;
    private TicketStatus status;
    private Integer numberOfTickets;

    public TicketDTO(Ticket ticket) {
        this(ticket.getId(), ticket.getFlight(), ticket.getAppUser(), ticket.getStatus(), ticket.getNumberOfTickets());
    }
}
