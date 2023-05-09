import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {
  apiHost: string = 'http://localhost:8082/';
  headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});


  constructor(private http: HttpClient) { }

  createAccommodation(accommodation: any): Observable<any> {
    return this.http.post<any>(this.apiHost + 'api/accommodation/create', accommodation, {headers: this.headers});
  }
}
