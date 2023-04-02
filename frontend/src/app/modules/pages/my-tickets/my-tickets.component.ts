import { Component, OnInit } from '@angular/core';
import {Ticket} from "../../airline/model/ticket";
import {TicketService} from "../../airline/service/ticket.service";
import {TokenStorageService} from "../../airline/service/token-storage.service";

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.css']
})
export class MyTicketsComponent implements OnInit {

  tickets: Ticket[] = [];
  errorMessage: string = '';

  constructor(
    private tokenStorageService: TokenStorageService,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    const userId = this.tokenStorageService.getUser().id;
    this.ticketService.getTicketsByUserId(userId).subscribe(
      (tickets) => {
        // handle success
        this.tickets = tickets;
      },
      (error) => {
        // handle error
        console.error(error);
        this.errorMessage = 'An error occurred. Please try again later.';
      }
    );
  }
}
