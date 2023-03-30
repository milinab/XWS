import { Component, OnInit } from '@angular/core';
import {RegisterRequest} from "../../airline/dto/registerRequest.model";
import {AuthService} from "../../airline/service/auth.service";
import {Router} from "@angular/router";
import {catchError} from "rxjs";
import {LoginRequest} from "../../airline/dto/loginRequest.model";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm = new FormGroup({
    firstName: new FormControl<string | undefined>(undefined),
    lastName: new FormControl<string | undefined>(undefined),
    email: new FormControl<string | undefined>(undefined),
    username: new FormControl<string | undefined>(undefined),
    password: new FormControl<string | undefined>(undefined)
  })

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  public signUp() {
    const registerRequest:RegisterRequest = new RegisterRequest({
      username: this.registerForm.controls.username.value!,
      firstName: this.registerForm.controls.firstName.value!,
      lastName: this.registerForm.controls.lastName.value!,
      email: this.registerForm.controls.email.value!,
      password: this.registerForm.controls.password.value!,
    })
    console.log(registerRequest);
    this.authService.register(registerRequest).subscribe({
        next: response => {
          console.log(response)
          alert("Successfully registered, you can log in!");
          this.router.navigate(['']).then(
            ()=>{
              window.location.reload();
            }
          );
        },
        error: message => {
          console.log(message.Error)
          alert("Boom!Error!")
        }

      }
    )
  }

}
