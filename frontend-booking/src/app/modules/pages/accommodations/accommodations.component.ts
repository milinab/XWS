import { Component, OnInit } from '@angular/core';
import { AccommodationService } from "../../booking/services/accommodation.service";
import { TokenStorageService } from "../../booking/services/token-storage.service";
import { Reservation } from "../../booking/model/reservation.model";
import { Accommodation } from "../../booking/model/accommodation";
import { AccommodationDto } from "../../booking/model/accomodation.dto";
import { AvailablePeriodService } from "../../booking/services/availablePeriod.service";
import { AvailablePeriod } from "../../booking/model/availablePeriod";
import {AvailablePeriodDto} from "../../booking/model/availablePeriodDto";
import {ChangePasswordComponent} from "../change-password/change-password.component";
import {MatDialog} from "@angular/material/dialog";
import {EditPeriodComponent} from "../edit-period/edit-period.component";

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
  availablePeriods: AvailablePeriodDto[] = [];

  public accommodation: Accommodation = new Accommodation();
  public availablePeriod: AvailablePeriod = new AvailablePeriod();

  constructor(public dialog: MatDialog, private accommodationService: AccommodationService, private tokenStorageService: TokenStorageService,
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
        this.availablePeriods = periods;
        // this.availablePeriods.push(periods);
        console.log("PERIODDDDDD", periods)
        console.log(this.availablePeriods);
      },
      (error) => {
        console.error('Error loading available periods:', error);
      }
    );
  }

  showEditWindow(period: AvailablePeriodDto) : void {
    const dialogRef = this.dialog.open(EditPeriodComponent, {
      width: '280px',
      data: {
        period: period,
        id: period.id,
        accommodationId: period.accomodationId
      }
    })
  }


 /* updateAvailablePeriod(id: string) {
    this.availablePeriodService.update(this.availablePeriod).subscribe({
      next: (response) => {
        // Handle the successful response here
        console.log('Update successful:', response);
        alert("Successfully changed!");
      },
      error: (error) => {
        // Handle any errors here
        console.error('Error:', error);
        alert("There was an error changing available period!")
      }
    });
  }*/

}
