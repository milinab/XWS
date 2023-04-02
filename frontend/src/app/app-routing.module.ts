import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./modules/pages/home/home.component";
import {TicketStoreComponent} from "./modules/pages/ticket-store/ticket-store.component";
import {FlightsComponent} from "./modules/pages/flights/flights.component";


import {LoginComponent} from "./modules/pages/login/login.component";
import {RegistrationComponent} from "./modules/pages/registration/registration.component";
import {CreateFlightComponent} from "./modules/pages/create-flight/create-flight.component";
import {MyTicketsComponent} from "./modules/pages/my-tickets/my-tickets.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ticket-store', component: TicketStoreComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'create-flight', component: CreateFlightComponent },
  { path: 'home', component: HomeComponent },
  { path: 'search-flights', component: FlightsComponent},
  { path: 'my-tickets', component: MyTicketsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
