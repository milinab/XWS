import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./modules/pages/home/home.component";
import {AccommodationCreateComponent} from "./modules/booking/accommodation-create/accommodation-create.component";
import {LoginComponent} from "./modules/pages/login/login.component";
import {RegistrationComponent} from "./modules/pages/registration/registration.component";
import {SettingsComponent} from "./modules/settings/settings.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'accommodation-create', component: AccommodationCreateComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegistrationComponent},
  { path: 'settings', component: SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
