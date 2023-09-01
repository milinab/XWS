import { Component, OnInit } from '@angular/core';
import {Accommodation} from "../../booking/model/accommodation";
import {AccommodationService} from "../../booking/services/accommodation.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchRequest = {
    city: '',
    startDate: '',
    endDate: '',
    numberOfGuests: 0
  }

  searchResponse: Accommodation[] | undefined;

  constructor(private accommodationService: AccommodationService) { }

  ngOnInit(): void {
    console.log("Home Component nmOnInit()")
  }

  searchAccommodations() {
    this.accommodationService.searchAccommodations(this.searchRequest).subscribe((res) => {
      this.searchResponse = res;
    })
  }

  submit() {

  }

}
