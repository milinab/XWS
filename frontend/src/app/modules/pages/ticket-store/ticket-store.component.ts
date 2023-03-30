import { Component, OnInit } from '@angular/core';
import { Flight } from '../../airline/model/flight';
import { Ticket } from '../../airline/model/ticket';
import { FlightService } from '../../airline/service/flight.service';
import { TicketService } from '../../airline/service/ticket.service';

@Component({
  selector: 'app-ticket-store',
  templateUrl: './ticket-store.component.html',
  styleUrls: ['./ticket-store.component.css'],
})
export class TicketStoreComponent implements OnInit {
  flights: Flight[] = [];
  flight: any;
  selectedFlight: any;
  numTickets: any;

  constructor(
    private flightService: FlightService,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.flightService.getAllFlights().subscribe((flights) => {
      this.flights = flights;
    });
  }

  buyTickets(): void {
    const tickets: Ticket = {
      flightId: this.selectedFlight.id,
      numberOfTickets: this.numTickets,
      appUserId: "asdfas"
    };

    this.ticketService.createMultipleTickets(tickets).subscribe(
      (createdTickets) => {
        // handle success
        console.log(createdTickets);
      },
      (error) => {
        // handle error
        console.error(error);
      }
    );
  }

  onFlightSelection(flight: Flight) {
    this.selectedFlight = flight;
  }
}
