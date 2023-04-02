import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TokenStorageService} from "../../airline/service/token-storage.service";
import {FlightService} from "../../airline/service/flight.service";
import {Flight} from "../../airline/model/flight";
import {CreateFlight} from "../../airline/model/createFlight";

@Component({
  selector: 'app-home',
  templateUrl: './create-flight.component.html',
  styleUrls: ['./create-flight.component.css']
})
export class CreateFlightComponent implements OnInit {

  priceFormControl = new FormControl('', [Validators.required, Validators.pattern(/^[1-9]\d*(\.\d+)?$/)]); //float
  maxCapFormControl = new FormControl('', [Validators.required, Validators.pattern(/^[1-9]\d*$/)]); //int
  dateFormControl = new FormControl('', [Validators.required, Validators.required]);
  placeDFormControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]); //string
  placeAFormControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]);

  public flight: CreateFlight = new CreateFlight();
  myGroup = new FormGroup({
    firstName: new FormControl()
  });

  constructor(private tokenStorageService: TokenStorageService,
              private flightService: FlightService) { }

  ngOnInit(): void {
  }

  createFlight(): void {
    console.log(this.flight)
    console.log(this.flight.departureTime)
    try {
        this.flightService.createFlight(this.flight).subscribe(res => {
        alert("Flight created.")
        })
    } catch (error) {
      alert(error)
    }
  }

}
