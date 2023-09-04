import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Reservation} from "../model/reservation.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  apiHost: string = 'http://localhost:8001/';
  headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  createReservation(newReservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.apiHost}api/Reservation`, newReservation, { headers: this.headers });
  }
  getAllReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiHost}api/Reservation`);
  }
  getHost(accomodationId: string): Observable<string> {
    const requestBody = { accomodationId };
    return this.http.post<string>(`${this.apiHost}api/Reservation/host`, requestBody);
  }
  acceptReservation(id: string): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiHost}api/Reservation/${id}/accept`, null, { headers: this.headers });
  }

  declineReservation(id: string): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiHost}api/Reservation/${id}/decline`, null, { headers: this.headers });
  }

  getUserReservations(id: string): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiHost}api/Reservation/by-guest/${id}`, {headers: this.headers});
  }

  cancelReservation(id: string): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiHost}api/Reservation/${id}/cancel`, { headers: this.headers });
  }


  getReservationsByGuestId(guestId: string): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiHost}api/Reservation/guest/${guestId}`);
  }
}
