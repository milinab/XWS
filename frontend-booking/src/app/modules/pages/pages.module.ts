import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MaterialModule} from "../../material/material.module";
import {MatInputModule} from "@angular/material/input";
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PendingComponent } from './pending/pending.component';
import {UserReservationsComponent} from "./user-reservations/user-reservations.component";
import { HostGradesComponent } from './host-grades/host-grades.component';
import { GradeComponent } from './grade/grade.component';
import { GuestGradesComponent } from './guest-grades/guest-grades.component';
import { AccommodationsComponent } from './accommodations/accommodations.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { GradeAccomodationComponent } from './grade-accomodation/grade-accomodation.component';
import { GuestGradesAccomodationComponent } from './guest-grades-accomodation/guest-grades-accomodation.component';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    UserReservationsComponent,
    PendingComponent,
    ChangePasswordComponent,
    HostGradesComponent,
    GradeComponent,
    GuestGradesComponent,
    AccommodationsComponent,
    GradeAccomodationComponent,
    GuestGradesAccomodationComponent,
  ],
    imports: [
        CommonModule,
        AppRoutingModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MaterialModule,
        FormsModule,
        MatInputModule,
        MatButtonToggleModule
    ]
})
export class PagesModule { }
