import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserToken } from "../booking/model/user-token.model";
import {TokenStorageService} from "../booking/services/token-storage.service";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: UserToken;
  role: any;
  isLoggedIn: boolean = false;

  constructor(private tokenStorageService: TokenStorageService, private router: Router) {
    this.user = this.tokenStorageService.getUser()
    this.isLoggedIn = this.tokenStorageService.isLoggedIn()
  }

  ngOnInit(): void {
  }

  signOut() {
    this.tokenStorageService.signOut()
    this.router.navigate(['']).then(() => {
      window.location.reload();
    })
  }

  routeToSignUp(): void {
    this.router.navigate(['/register']);
  }

  routeToSignIn(): void {
    this.router.navigate(['/login']);
  }

  routeToCart(): void {
    console.log(this.tokenStorageService.getUser().id)
    this.router.navigate(['/settings']);
  }

}
