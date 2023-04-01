import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HomeComponent } from './home/home.component';
import { TicketStoreComponent } from './ticket-store/ticket-store.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import { FlightsComponent } from './flights/flights.component';

@NgModule({
  declarations: [
    HomeComponent,
    TicketStoreComponent,
    FlightsComponent,
  ],
    imports: [
        CommonModule,
        AppRoutingModule,
        MatFormFieldModule,
        FormsModule,
    ]
})
export class PagesModule { }
