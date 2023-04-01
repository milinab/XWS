import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./modules/pages/home/home.component";
import {TicketStoreComponent} from "./modules/pages/ticket-store/ticket-store.component";
import {LoginComponent} from "./modules/pages/login/login.component";
import {RegistrationComponent} from "./modules/pages/registration/registration.component";
import {CreateFlightComponent} from "./modules/pages/create-flight/create-flight.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ticket-store', component: TicketStoreComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'create-flight', component: CreateFlightComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
