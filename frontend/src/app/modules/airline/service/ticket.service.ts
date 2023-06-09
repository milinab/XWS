import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Ticket} from "../model/ticket";

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private baseUrl = 'http://localhost:8082/api/tickets';

  constructor(private http: HttpClient) { }

  createTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(`${this.baseUrl}`, ticket);
  }

  createMultipleTickets(tickets: Ticket): Observable<Ticket[]> {
    return this.http.post<Ticket[]>(`${this.baseUrl}/multiple`, tickets);
  }

  getAllTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.baseUrl}`);
  }

  getTicketsByUserId(userId: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.baseUrl}/tickets/appUserId/${userId}`);
  }
}
