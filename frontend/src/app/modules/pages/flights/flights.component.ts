import { Component, OnInit } from '@angular/core';
import {FlightService} from "../../airline/service/flight.service";
import {Flight} from "../../airline/model/flight";

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {
  departurePlace: any;
  arrivalPlace: any;
 // flightsSearch: Flight[] | undefined;
  flights: Flight[] | undefined;


  constructor(private flightService: FlightService) { }

  ngOnInit(): void {
    this.getFlights();
  }

  getFlights(): void {
    this.flightService.getAllFlights().subscribe(flights => {
      this.flights = flights;
    });
  }

  onSubmit() {
    this.flightService.searchFlights(this.departurePlace, this.arrivalPlace).subscribe(flights=>{
      this.flights = flights.filter(flight =>
        flight.departurePlace === this.departurePlace && flight.arrivalPlace === this.arrivalPlace
      );
    })

  }
}
