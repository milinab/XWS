package com.example.demo.dto;

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
    private Integer id;
    private Flight flight;
    private AppUser appUser;

    public TicketDTO(Ticket ticket) {
    }
}
