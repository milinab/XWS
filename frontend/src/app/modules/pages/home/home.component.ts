import { Component, OnInit } from '@angular/core';
import {Flight} from "../../airline/model/flight";
import {FlightService} from "../../airline/service/flight.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchResults: Flight[] | undefined;
  searchCriteria = {
    departurePlace: '',
    arrivalPlace: '',
    departureDate: '',
    arrivalDate: '',
    numPassengers: 0
  };

  constructor(private flightService: FlightService, private router: Router) { }

  ngOnInit(): void {
  }

  searchFlights() {
    this.flightService.searchFlights(this.searchCriteria).subscribe((res) => {
      this.searchResults = res;
      console.log(this.searchResults)
      this.router.navigate(['searched-flights', {queryParams: JSON.stringify(this.searchResults)}]);
      console.log("ispod");
      console.log(this.searchResults)
    });


  }
  // searchFlights() {
  //   this.flightService.searchFlights(this.searchCriteria).subscribe((res) => {
  //     this.router.navigate(['searched-flights']).then(() => {
  //       this.searchResults = res;
  //     });
  //   });
  //}

}
