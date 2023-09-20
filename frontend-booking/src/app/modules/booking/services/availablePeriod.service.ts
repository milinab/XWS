import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AccommodationDto} from "../model/accomodation.dto";
import {Observable} from "rxjs";
import {AvailablePeriod} from "../model/availablePeriod";
import {AvailablePeriodDto} from "../model/availablePeriodDto";

@Injectable({
  providedIn: 'root'
})
export class AvailablePeriodService{
  apiHost: string = 'http://localhost:8001/';
  headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});


  constructor(private http: HttpClient) {
  }

  create(availablePeriod: AvailablePeriod): Observable<any> {
    return this.http.post<any>(this.apiHost + 'api/AvailablePeriod', availablePeriod, {headers: this.headers});
  }

  update(availablePeriod: AvailablePeriod): Observable<boolean> {
    return this.http.put<boolean>(this.apiHost+`api/AvailablePeriod`, availablePeriod);
  }

  getAvailablePeriodByAccommodationId(id: string): Observable<AvailablePeriodDto[]> {
    return this.http.get<AvailablePeriodDto[]>(this.apiHost + `api/AvailablePeriod/${id}/GetAvailablePeriodByAccomodationId`);
  }

}
