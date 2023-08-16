import { Component, OnInit } from '@angular/core';
import {AccommodationService} from "../services/accommodation.service";
import {Accommodation} from "../model/accommodation";
import {enableProdMode} from '@angular/core';

@Component({
  selector: 'app-accommodation-create',
  templateUrl: './accommodation-create.component.html',
  styleUrls: ['./accommodation-create.component.css']
})
export class AccommodationCreateComponent implements OnInit {

  public accommodation : Accommodation = new Accommodation();
  constructor(private accommodationService: AccommodationService) { }
  ngOnInit(): void {
    console.log("Accommodation Service ngOnInit()")
  }

  createAccommodation() {
  console.log(this.accommodation)
  try {
  this.accommodationService.createAccommodation(this.accommodation).subscribe(res => {
  alert("Accommodation created.")
})
} catch (error) {
  alert(error)
}
}

  handlePhotosChange($event: Event) {

  }
}
