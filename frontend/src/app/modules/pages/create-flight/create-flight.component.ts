import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
  }

  saveFlight() {

  }
}
