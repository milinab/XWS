import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MaterialModule } from "./material/material.module";
import { HospitalModule } from "./modules/hospital/hospital.module";
import { PagesModule } from "./modules/pages/pages.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccommodationCreateComponent } from './modules/booking/accommodation-create/accommodation-create.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { NavbarComponent } from './modules/navbar/navbar.component';
import { SettingsComponent } from './modules/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    AccommodationCreateComponent,
    NavbarComponent,
    SettingsComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    PagesModule,
    HospitalModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
