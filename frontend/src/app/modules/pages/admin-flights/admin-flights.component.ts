import { Component, OnInit } from '@angular/core';
import {FlightService} from "../../airline/service/flight.service";
import {Flight} from "../../airline/model/flight";
import {FormBuilder, FormGroup} from "@angular/forms";
import {enableProdMode} from '@angular/core';
import {Status} from "../../airline/enums/status.enum";

@Component({
  selector: 'app-admin-flights',
  templateUrl: './admin-flights.component.html',
  styleUrls: ['./admin-flights.component.css'],

})
export class AdminFlightsComponent implements OnInit {
  flights: Flight[] | undefined;

  constructor(private flightService: FlightService) { }

  ngOnInit(): void {
    this.initFlights();
  }
/*
  cancelFlight(fl: string, status: Status) {
    this.flightService.getById(fl).subscribe({
      next: response => {
        var data = response;
        var flight = new Flight({
          id: fl,
          departureDate: data.departureDate,
          arrivalDate: data.arrivalDate,
          departureTime: data.departureTime,
          arrivalTime: data.arrivalTime,
          departurePlace: data.departurePlace,
          arrivalPlace: data.arrivalPlace,
          price: data.price,
          maxCapacity: data.maxCapacity,
          status: 4
        })
      }
    })
  }*/

  public cancelFlight(id: string) {
    this.flightService.cancelFlight(id).subscribe( res =>
    {
      this.initFlights();
      alert("Success!")
    }, error => {
      alert("Unable to delete flight")
    })
  }

  public initFlights(): void {
    this.flightService.getAllFlights().subscribe(res => {
      this.flights = res;
      let i = 0;
      while (i < this.flights.length) {
        this.flights[i] = this.remainingTickets(this.flights[i])
        i++
      }
      console.log(this.flights)
    });
  }

  public statusToString(status:any){
    if (status == "SCHEDULED"){
      return "SCHEDULED";
    }else if (status == "BOARDING"){
      return "BOARDING";
    }else if (status == "DEPARTED"){
      return "DEPARTED";
    } else if (status == "ARRIVED") {
      return "ARRIVED";
    } else if (status == "CANCELLED") {
      return "CANCELLED";
    } else{
      return "Unknown";
    }
  }

  remainingTickets(flight: Flight): Flight {
    this.flightService.getRemaining(flight.id).subscribe(res => {
      flight.remainingTickets = res;
    });
    return flight;
  }
}
