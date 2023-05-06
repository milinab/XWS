import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./modules/pages/home/home.component";
import {AccommodationCreateComponent} from "./modules/booking/accommodation-create/accommodation-create.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'accommodation-create', component: AccommodationCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
