import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {EditUserDto} from "../modules/booking/model/editUserDto";
import {EditUserNoIdDto} from "../modules/booking/model/editUserNoIdDto";
import {Reservation} from "../modules/booking/model/reservation.model";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiHost: string = 'http://localhost:8001/api/User/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getUser(id: string): Observable<EditUserDto> {
    return this.http.get<EditUserDto>(this.apiHost + 'get/'+ id,  {headers: this.headers});
  }

  editInfo(editInfo: any, id: string): Observable<any> {
    return this.http.post<any>(this.apiHost + id, editInfo, { headers: this.headers });
  }

  changePassword(password: any, id: string): Observable<any> {
    return this.http.post<any>(this.apiHost + 'change-password/'+ id, password, { headers: this.headers });
  }

  deleteAccount(id: string): Observable<any> {
    return this.http.get<any>(this.apiHost + 'delete/'+ id,{headers: this.headers});
  }

}
