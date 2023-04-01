import { Component, OnInit } from '@angular/core';
import { Flight } from '../../airline/model/flight';
import { Ticket } from '../../airline/model/ticket';
import { FlightService } from '../../airline/service/flight.service';
import { TicketService } from '../../airline/service/ticket.service';
import { TokenStorageService } from "../../airline/service/token-storage.service";

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
  errorMessage: string = '';

  constructor(
    private tokenStorageService: TokenStorageService,
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
      appUserId: this.tokenStorageService.getUser().id
    };
    this.errorMessage = '';

    this.ticketService.createMultipleTickets(tickets).subscribe(
      (createdTickets) => {
        // handle success
        console.log(createdTickets);
      },
      (error) => {
        // handle error
        console.error(error);
        if (error.status === 400) {
          // display error message in template
          this.errorMessage = 'Not enough capacity';
        } else {
          // display generic error message in template
          this.errorMessage = 'An error occurred. Please try again later.';
        }

      }
    );
  }

  onFlightSelection(flight: Flight) {
    this.selectedFlight = flight;
  }
}
