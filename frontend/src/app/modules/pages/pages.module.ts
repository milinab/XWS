import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HomeComponent } from './home/home.component';
import { TicketStoreComponent } from './ticket-store/ticket-store.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import { FlightsComponent } from './flights/flights.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from "@angular/material/button";
import {CreateFlightComponent} from "./create-flight/create-flight.component";
import {MaterialModule} from "../../material/material.module";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { MatSelectModule } from '@angular/material/select';
import {MatIconModule} from "@angular/material/icon";
import {AdminFlightsComponent} from "./admin-flights/admin-flights.component";


@NgModule({
  declarations: [
    HomeComponent,
    TicketStoreComponent,
    FlightsComponent,
    RegistrationComponent,
    LoginComponent,
    CreateFlightComponent,
    AdminFlightsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    NgxMaterialTimepickerModule,
    MatDatepickerModule,
    MatIconModule
  ]
})
export class PagesModule { }
