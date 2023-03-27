import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./modules/pages/home/home.component";
import {TicketStoreComponent} from "./modules/pages/ticket-store/ticket-store.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'ticket-store', component: TicketStoreComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
