import { Component, OnInit } from '@angular/core';
import {UserToken} from "../modules/airline/model/user-token.model";
import {TokenStorageService} from "../modules/airline/service/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: UserToken;
  role: any;
  isLoggedIn: boolean = false;

  constructor(private tokenStorageService: TokenStorageService,  private router: Router) {
    this.user = this.tokenStorageService.getUser()
    this.isLoggedIn = this.tokenStorageService.isLoggedIn()
  }

  ngOnInit(): void {
  }

  signOut() {
    this.tokenStorageService.signOut()
    this.router.navigate(['']).then(()=>{
      window.location.reload();
    })
  }

  isRegisteredUser(): boolean{
    if(this.tokenStorageService.getUser().role.toString() == 'USER'){
      return true;
    }
    return false;
  }

  isAdmin(): boolean{
    if(this.tokenStorageService.getUser().role.toString() == 'ADMIN'){
      return true;
    }
    return false;
  }

  openRegistration(): void {
    this.router.navigate(['/registration']);
  }

  openLogin(): void {
    this.router.navigate(['/login']);
  }


  openHome(): void {
    this.router.navigate(['']);
  }

}
