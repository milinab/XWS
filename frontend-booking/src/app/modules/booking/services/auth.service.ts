import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiHost: string = 'http://localhost:8001/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  authenticate(loginRequest: any): Observable<any> {
    return this.http.post<any>(this.apiHost + 'api/User/authenticate', loginRequest, {headers: this.headers});
  }

  register(registerRequest: any): Observable<any> {
    return this.http.post<any>(this.apiHost + 'api/User/register', registerRequest, {headers: this.headers});
  }

}
