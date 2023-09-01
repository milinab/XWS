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
}
