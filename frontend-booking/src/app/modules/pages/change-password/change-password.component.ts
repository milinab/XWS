import {Component, Inject, OnInit} from '@angular/core';
import {SettingsComponent} from "../../settings/settings.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../services/user.service";
import {PasswordRequest} from "../../booking/model/passwordRequest";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  password: PasswordRequest = new PasswordRequest();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<SettingsComponent>, private userService: UserService) {
  }

  ngOnInit(): void {
  }

  savePassword() {
    this.userService.changePassword(this.password, this.data.userId).subscribe({
      next: (response) => {
        // Handle the successful response here
        console.log('Request successful:', response);
        alert("Successfully changed!");
      },
      error: (error) => {
        // Handle any errors here
        console.error('Error:', error);
        alert("There was an error changing your information!");
      }
    })
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }
}
