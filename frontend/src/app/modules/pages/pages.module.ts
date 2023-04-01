import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HomeComponent } from './home/home.component';
import { TicketStoreComponent } from './ticket-store/ticket-store.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from "@angular/material/button";
import {CreateFlightComponent} from "./create-flight/create-flight.component";
import {MaterialModule} from "../../material/material.module";

@NgModule({
  declarations: [
    HomeComponent,
    TicketStoreComponent,
    RegistrationComponent,
    LoginComponent,
    CreateFlightComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MaterialModule
  ]
})
export class PagesModule { }
