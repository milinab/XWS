import { Component, OnInit } from '@angular/core';
import { AccommodationService } from "../../booking/services/accommodation.service";
import { TokenStorageService } from "../../booking/services/token-storage.service";
import { Reservation } from "../../booking/model/reservation.model";
import { Accommodation } from "../../booking/model/accommodation";
import { AccommodationDto } from "../../booking/model/accomodation.dto";
import { AvailablePeriodService } from "../../booking/services/availablePeriod.service";
import { AvailablePeriod } from "../../booking/model/availablePeriod";

@Component({
  selector: 'app-accommodations',
  templateUrl: './accommodations.component.html',
  styleUrls: ['./accommodations.component.css']
})
export class AccommodationsComponent implements OnInit {
  hostId: string = '';
  accomodations: Accommodation[] = [];
  accomodationId: string = '';
  showAvailablePeriods: { [key: string]: boolean } = {};
  availablePeriods: AvailablePeriod[] = [];

  public accommodation: Accommodation = new Accommodation();
  public availablePeriod: AvailablePeriod = new AvailablePeriod();

  constructor(private accommodationService: AccommodationService, private tokenStorageService: TokenStorageService,
              private availablePeriodService: AvailablePeriodService) {
    this.hostId = this.tokenStorageService.getUser().id;
  }

  ngOnInit(): void {
    this.loadAccomodations();
  }

  loadAccomodations() {
    this.accommodationService.GetAccomodations().subscribe(
      (accomodations) => {
        // Filter reservations based on the hostId
        this.accomodations = accomodations.filter(
          (accommodation) => accommodation.hostId === this.hostId // Use '===' for comparison
        );
        console.log(this.accomodations);
      },
      (error) => {
        console.error('Error loading reservations:', error);
      }
    );
  }

  createAvailablePeriod(accomodationId: string) {
    this.availablePeriod.accomodationId = accomodationId;
    this.availablePeriodService.create(this.availablePeriod).subscribe(
      (res) => {
        alert("Available period created.");
      },
      (error) => {
        console.error(error);
        alert("Error creating available period. Please check the console for details.");
      }
    );
  }

  showAvailablePeriodsForm(accommodationId: string) {
    // Toggle the showAvailablePeriods flag for the selected accommodation
    this.showAvailablePeriods[accommodationId] = !this.showAvailablePeriods[accommodationId];

    // Load available periods only if the flag is true
    if (this.showAvailablePeriods[accommodationId]) {
      this.loadAvailablePeriods(accommodationId);
    }
  }
  loadAvailablePeriods(accommodationId: string) {
    console.log(accommodationId);
    this.availablePeriodService.getAvailablePeriodByAccommodationId(accommodationId).subscribe(
      (periods) => {

        this.availablePeriods.push(periods);
        console.log(periods)
        console.log(this.availablePeriods);
      },
      (error) => {
        console.error('Error loading available periods:', error);
      }
    );
  }
}
