import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AccommodationDto} from "../model/accomodation.dto";
import {Reservation} from "../model/reservation.model";
import {Accommodation} from "../model/accommodation";
import {GradeDto} from "../dto/gradeDto.model";
import {HostGrade} from "../model/hostGrade";
import {GradeAccomodationDto} from "../dto/gradeAccomodationDto.model";
import {AccomodationGrade} from "../model/accomodationGrade.model";

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

  getAllAccommodations(): Observable<any> {
    return this.http.get<any>(this.apiHost + 'api/Accomodation', {headers: this.headers})
  }

  GetAccomodations(): Observable<Accommodation[]> {
    return this.http.get<Accommodation[]>(`${this.apiHost}api/Accomodation`);
  }
  createAccomodationGrade(newAccomodationGrade: GradeAccomodationDto): Observable<GradeDto> {
    return this.http.post<HostGrade>(this.apiHost + 'api/Accomodation/grade', newAccomodationGrade, { headers: this.headers });
  }

  updateAccomodationGrade(id: string, updateHostGrade: AccomodationGrade): Observable<void> {
    return this.http.put<void>(this.apiHost + 'api/Accomodation/updateGrade/' + id, updateHostGrade, { headers: this.headers });
  }

  deleteHostGrade(id: string): Observable<void> {
    return this.http.delete<void>(this.apiHost + 'api/Accomodation/deleteGrade/' + id);
  }

  getAccomodationGradesByAccomodationId(id: string): Observable<AccomodationGrade[]> {
    return this.http.get<AccomodationGrade[]>(this.apiHost + 'api/Accomodation/getByAccomodation/' + id);
  }

  getGradesByGuestId(guestId: string): Observable<AccomodationGrade[]> {
    return this.http.get<AccomodationGrade[]>(this.apiHost + 'api/Accomodation/getByGuest/' + guestId);
  }


}
