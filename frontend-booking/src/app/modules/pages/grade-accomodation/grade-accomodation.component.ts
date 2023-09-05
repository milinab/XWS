import { Component, OnInit } from '@angular/core';
import {Reservation} from "../../booking/model/reservation.model";
import {GradeDto} from "../../booking/dto/gradeDto.model";
import {AuthService} from "../../booking/services/auth.service";
import {ReservationService} from "../../booking/services/reservation.service";
import {TokenStorageService} from "../../booking/services/token-storage.service";
import {GradeAccomodationDto} from "../../booking/dto/gradeAccomodationDto.model";
import {AccommodationService} from "../../booking/services/accommodation.service";

@Component({
  selector: 'app-grade-accomodation',
  templateUrl: './grade-accomodation.component.html',
  styleUrls: ['./grade-accomodation.component.css']
})
export class GradeAccomodationComponent implements OnInit {
  reservations: Reservation[] = [];
  guestId: string = '';

  newAccomodationGrade: GradeAccomodationDto = new GradeAccomodationDto();
  constructor(private accomodationGradeService: AccommodationService, private reservationService: ReservationService, private tokenStorageService: TokenStorageService) {
    this.guestId = this.tokenStorageService.getUser().id;
    this.loadReservationsByGuestId(this.guestId);
  }

  createAccomodationGrade(reservation: Reservation) {
    this.newAccomodationGrade.accomodationId = reservation.accomodationId;
    this.newAccomodationGrade.guestId = this.guestId;
    this.newAccomodationGrade.guestUsername = 'anonymous';
    this.newAccomodationGrade.created = new Date();

    if (this.newAccomodationGrade.validate()) {
      // Call the API to create host grade
      this.accomodationGradeService.createAccomodationGrade(this.newAccomodationGrade).subscribe((result) => {
        // Handle success, e.g., show a success message
        console.log('Accomodation grade created successfully:', result);
      }, (error) => {
        // Handle error, e.g., show an error message
        console.error('Error creating accommodation grade:', error);
      });
    } else {
      // Handle validation error, e.g., show an error message
      console.error('Invalid accommodation grade value. It should be between 1 and 5.');
    }
  }

  loadReservationsByGuestId(guestId: string): void {
    this.reservationService.getReservationsByGuestId(guestId).subscribe((reservations) => {
      console.log(reservations);

      // Filter reservations by status and endDate
      this.reservations = reservations.filter((reservation) => {
        return reservation.status === 0 && new Date(reservation.endDate) < new Date();
      });
    });
  }

  ngOnInit(): void {
  }

}
