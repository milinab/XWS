import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {HostGrade} from "../model/hostGrade";
import {GradeDto} from "../dto/gradeDto.model";
import {GradeComponent} from "../../pages/grade/grade.component";


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

  createHostGrade(newHostGrade: GradeDto): Observable<GradeDto> {
    return this.http.post<HostGrade>(this.apiHost + 'api/User/grade', newHostGrade, { headers: this.headers });
  }

  updateHostGrade(id: string, updateHostGrade: HostGrade): Observable<void> {
    return this.http.put<void>(this.apiHost + 'api/User/updateGrade/' + id, updateHostGrade, { headers: this.headers });
  }

  deleteHostGrade(id: string): Observable<void> {
    return this.http.delete<void>(this.apiHost + 'api/User/deleteGrade/' + id);
  }

  getHostGradesByHostId(id: string): Observable<HostGrade[]> {
    return this.http.get<HostGrade[]>(this.apiHost + 'api/User/getByHost/' + id);
  }

  getGradesByGuestId(guestId: string): Observable<HostGrade[]> {
    return this.http.get<HostGrade[]>(this.apiHost + 'api/User/getByGuest/' + guestId);
  }

}
