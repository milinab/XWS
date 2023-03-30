import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Flight} from "../model/flight";

@Injectable({
  providedIn: 'root'
})
export class FlightService{
  private readonly API_URL = 'http://localhost:8082/api/flights/all';

  constructor(private http: HttpClient) {
  }

  getAllFlights(): Observable<Flight[]>{
    return this.http.get<Flight[]>(this.API_URL);
  }
}
