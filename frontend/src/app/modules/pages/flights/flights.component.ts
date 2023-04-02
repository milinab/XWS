import { Component, OnInit } from '@angular/core';
import {FlightService} from "../../airline/service/flight.service";
import {Flight} from "../../airline/model/flight";
import {FormBuilder, FormGroup} from "@angular/forms";
import {enableProdMode} from '@angular/core';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css'],

})
export class FlightsComponent implements OnInit {
   searchResults: Flight[] | undefined;
    isHidden: boolean = true;
  searchCriteria = {
    departurePlace: '',
    arrivalPlace: '',
    departureDate: '',
    arrivalDate: '',
    numPassengers: 0,

  };

  constructor(private flightService: FlightService) { }

  ngOnInit(): void {
    this.getFlights();
  }

  getFlights(): void {
    this.flightService.getAllFlights().subscribe(flights => {
      this.searchResults = flights;
    });
  }
  searchFlights() {
    this.flightService.searchFlights(this.searchCriteria).subscribe((res) => {
      this.searchResults = res;

    });

  }
  reset(){
    this.getFlights();
    this.isHidden = true;
  }
  hidden(){
    this.isHidden = !this.isHidden;
  }

}
