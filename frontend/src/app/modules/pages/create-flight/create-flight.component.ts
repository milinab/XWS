import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './create-flight.component.html',
  styleUrls: ['./create-flight.component.css']
})
export class CreateFlightComponent implements OnInit {

  departureDate = new Date()
  arrivalDate = new Date()
  departurePlace = ''
  arrivalPlace = ''
  priceFormControl = new FormControl('', [Validators.required, Validators.pattern(/^[1-9]\d*(\.\d+)?$/)]); //float
  maxCapFormControl = new FormControl('', [Validators.required, Validators.pattern(/^[1-9]\d*$/)]); //int
  dateFormControl = new FormControl('', [Validators.required, Validators.required]);
  placeDFormControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]); //string
  placeAFormControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]);

  constructor() { }

  ngOnInit(): void {
  }




  saveFlight() {

  }
}
