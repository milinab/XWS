import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {UserToken} from "../booking/model/user-token.model";
import {TokenStorageService} from "../booking/services/token-storage.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {EditUserDto} from "../booking/model/editUserDto";
import {Observable} from "rxjs";
import {EditUserNoIdDto} from "../booking/model/editUserNoIdDto";
import {ChangePasswordComponent} from "../pages/change-password/change-password.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  user: EditUserNoIdDto = new EditUserNoIdDto();
  isLoggedIn: boolean = false;


  constructor(public dialog: MatDialog, private tokenStorageService: TokenStorageService, private router: Router, private userService: UserService) {
    this.isLoggedIn = this.tokenStorageService.isLoggedIn()
    this.getUser();
  }



  ngOnInit(): void {


  }

  getUser(): void {

      this.userService.getUser(this.tokenStorageService.getUser().id).subscribe(res => {
        this.user.firstName = res.firstName;
        this.user.lastName = res.lastName;
        this.user.username = res.username;
        console.log(this.user)
      });
    }


  editInfo() {
    this.userService.editInfo(this.user, this.tokenStorageService.getUser().id).subscribe({
      next: (response) => {
        // Handle the successful response here
        console.log('Request successful:', response);
        alert("Successfully changed!");
      },
      error: (error) => {
        // Handle any errors here
        console.error('Error:', error);
        alert("There was an error changing your information!")
      }
    });
  }



  savePassword() : void {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '280px',
      data: {
        userId: this.tokenStorageService.getUser().id
      }
    })
  }

  deleteAccount() {
    this.userService.deleteAccount(this.tokenStorageService.getUser().id).subscribe({
      next: (response) => {
        // Handle the successful response here
        console.log('Request successful:', response);
        this.tokenStorageService.signOut()
        this.router.navigate(['']).then(() => {
          window.location.reload();
        })
        alert("Successfully deleted!");
      },
      error: (error) => {
        // Handle any errors here
        console.error('Error:', error);
        alert("You are not eligible for account removal, there might be active reservations!")
      }
    });
  }
}
