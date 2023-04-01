import { Component, OnInit } from '@angular/core';
import {FlightService} from "../../airline/service/flight.service";
import {Flight} from "../../airline/model/flight";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {
  departurePlace: any;
  arrivalPlace: any;
  searchResults: Flight[] | undefined;
  departureDate: any;
  arrivalDate: any;
  numPassengers: any;

  constructor(private flightService: FlightService) { }

  ngOnInit(): void {
    this.getFlights();

  }

  getFlights(): void {
    this.flightService.getAllFlights().subscribe(flights => {
      this.searchResults = flights;
    });
  }


}
