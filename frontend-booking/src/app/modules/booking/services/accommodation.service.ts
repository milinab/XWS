import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {
  apiHost: string = 'http://localhost:8001/';
  headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});


  constructor(private http: HttpClient) { }

  createAccommodation(accomodation: any): Observable<any> {
    return this.http.post<any>(this.apiHost + 'api/Accomodation', accomodation, {headers: this.headers});
  }

  searchAccommodations(searchRequest: any) {
    return this.http.post<any>(this.apiHost + 'api/accomodation/available', searchRequest, {headers: this.headers});
  }

  deleteAccommodations(id: any): Observable<any> {
    return this.http.get<any>(this.apiHost + 'api/Accomodation/delete/' + id, {headers: this.headers})
  }
}
