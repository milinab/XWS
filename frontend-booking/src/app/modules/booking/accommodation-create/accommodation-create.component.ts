import { Component, OnInit } from '@angular/core';
import {AccommodationService} from "../services/accommodation.service";
import {Accommodation} from "../model/accommodation";
import {enableProdMode} from '@angular/core';
import {AccommodationDto} from "../model/accomodation.dto";
import {Token} from "@angular/compiler";
import {TokenStorageService} from "../services/token-storage.service";

@Component({
  selector: 'app-accommodation-create',
  templateUrl: './accommodation-create.component.html',
  styleUrls: ['./accommodation-create.component.css']
})
export class AccommodationCreateComponent implements OnInit {
  hostId: string = '';

  public accommodation : AccommodationDto = new AccommodationDto();
  constructor(private accommodationService: AccommodationService, private tokenStorageService: TokenStorageService) {
    this.hostId = this.tokenStorageService.getUser().id;
  }

  ngOnInit(): void {
    console.log("Accommodation Service ngOnInit()")
  }
  createAccommodation() {
    console.log(this.accommodation);

    this.accommodation.hostId = this.hostId;
    console.log(this.accommodation.hostId)
    this.accommodationService.createAccommodation(this.accommodation).subscribe(
      (res) => {
        alert("Accommodation created.");
      },
      (error) => {
        console.error(error);
        alert("Error creating accommodation. Please check the console for details.");
      }
    );
  }

  handlePhotosChange($event: Event) {

  }
}
