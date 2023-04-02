import { Component, OnInit } from '@angular/core';
import {FlightService} from "../../airline/service/flight.service";
import {Flight} from "../../airline/model/flight";
import {FormBuilder, FormGroup} from "@angular/forms";
import {enableProdMode} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css'],

})
export class FlightsComponent implements OnInit {
   searchResults: Flight[] | undefined;
   // isHidden: boolean = true;
  searchCriteria = {
    departurePlace: '',
    arrivalPlace: '',
    departureDate: '',
    arrivalDate: '',
    numPassengers: 0,
  };

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // var searchedFlight = JSON.parse(t);

    this.searchResults = history.state.searchResults;
  console.log(this.searchResults);
    var a = this.route.snapshot.paramMap.getAll('queryParams')

    console.log("U FLIGHT:")
    console.log(a)

  }

  hidden(){
   // this.isHidden = !this.isHidden;
  }
}
