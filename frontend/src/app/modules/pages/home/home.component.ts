import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../airline/service/token-storage.service";
import {Router} from "@angular/router";
import {UserToken} from "../../airline/model/user-token.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: UserToken;
  role: any;
  isLoggedIn: boolean = false;

  constructor(private tokenStorageService: TokenStorageService,  private router: Router) {
    this.user = this.tokenStorageService.getUser()
    this.isLoggedIn = this.tokenStorageService.isLoggedIn()
  }

  ngOnInit(): void {
  }

  isAdmin(): boolean{
    if(this.tokenStorageService.getUser().role.toString() == 'ADMIN'){
      return true;
    }
    return false;
  }

  createFlight(): void {
    this.router.navigate(['/create-flight']);

  }
  allFlights(): void {
    this.router.navigate(['/admin-flights']);
  }
}
