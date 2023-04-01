import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {TokenStorageService} from "../../airline/service/token-storage.service";
import {Router} from "@angular/router";
import {LoginRequest} from "../../airline/dto/loginRequest.model";
import {AuthService} from "../../airline/service/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl<string | undefined>(undefined),
    password: new FormControl<string | undefined>(undefined)
  })

  constructor(private authService: AuthService, private tokenStorageService:TokenStorageService, private router:Router) { }

  ngOnInit(): void {
  }

  public signIn() {
    const loginRequest:LoginRequest = new LoginRequest({
      username: this.loginForm.controls.username.value!,
      password: this.loginForm.controls.password.value!,
    })
    console.log(loginRequest);
    this.authService.authenticate(loginRequest).subscribe({
        next: response => {
          console.log("X")
          console.log(response)
          this.tokenStorageService.saveToken(response.token)
          this.tokenStorageService.saveUser(response.token)
          alert("Success!");
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
