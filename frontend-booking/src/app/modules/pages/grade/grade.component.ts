import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../booking/services/auth.service";
import {HostGrade} from "../../booking/model/hostGrade";
import {ReservationService} from "../../booking/services/reservation.service";
import {Reservation} from "../../booking/model/reservation.model";
import {TokenStorageService} from "../../booking/services/token-storage.service";
import {GradeDto} from "../../booking/dto/gradeDto.model";

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})
export class GradeComponent implements OnInit {
  reservations: Reservation[] = [];
  guestId: string = '';

  newHostGrade: GradeDto = new GradeDto();
  constructor(private hostGradeService: AuthService, private reservationService: ReservationService, private tokenStorageService: TokenStorageService) {
    this.guestId = this.tokenStorageService.getUser().id;
    this.loadReservationsByGuestId(this.guestId);
  }

  createHostGrade(reservation: Reservation) {
    this.newHostGrade.hostId = reservation.hostId;
    this.newHostGrade.guestUsername = 'ana';
    this.newHostGrade.created = new Date();

    if (this.newHostGrade.validate()) {
      // Call the API to create host grade
      this.hostGradeService.createHostGrade(this.newHostGrade).subscribe((result) => {
        // Handle success, e.g., show a success message
        console.log('Host grade created successfully:', result);
      }, (error) => {
        // Handle error, e.g., show an error message
        console.error('Error creating host grade:', error);
      });
    } else {
      // Handle validation error, e.g., show an error message
      console.error('Invalid host grade value. It should be between 1 and 5.');
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
