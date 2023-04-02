import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Flight} from "../model/flight";

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private readonly API_URL = 'http://localhost:8082/api/flights/all';
  apiHost: string = 'http://localhost:8082/';
  headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  baseUrl: string = 'http://localhost:8082/api/flights';


  constructor(private http: HttpClient) {
  }

  getAllFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.API_URL);
  }

  searchFlights(searchCriteria: any) {
    const url = `${this.baseUrl}/search`;
    return this.http.get<Flight[]>(url, {params: searchCriteria});
  }

  createFlight(flight: any): Observable<any> {
    return this.http.post<any>(this.apiHost + 'api/flights', flight, {headers: this.headers});
  }

  //getById(id: string): Observable<Flight> {
  //  return this.http.get<Flight>(this.apiHost + 'api/flights/' + id, {headers: this.headers});
  //}

  cancelFlight(id: string): Observable<any>{
    return this.http.put<any>(this.apiHost + 'api/flights/cancel/' + id, {headers: this.headers});
  }

  getRemaining(id: string): Observable<number> {
    return this.http.get<number>(this.apiHost + 'api/tickets/remaining/' + id, {headers: this.headers});
  }
}
