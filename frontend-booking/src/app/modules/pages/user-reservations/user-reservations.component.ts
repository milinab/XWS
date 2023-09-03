import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../booking/services/auth.service";
import {Router} from "@angular/router";
import {Reservation} from "../../booking/model/reservation.model";
import {UserToken} from "../../booking/model/user-token.model";
import {ReservationService} from "../../booking/services/reservation.service";
import {TokenStorageService} from "../../booking/services/token-storage.service";

@Component({
  selector: 'app-user-reservations',
  templateUrl: './user-reservations.component.html',
  styleUrls: ['./user-reservations.component.css']
})
export class UserReservationsComponent implements OnInit {
  user: UserToken;
  guestId: string = '';
  userReservations: Reservation[] = [];

  constructor(private reservationService: ReservationService, private tokenStorageService: TokenStorageService) {
    this.user = this.tokenStorageService.getUser();
    this.guestId = this.tokenStorageService.getUser().id;
  }

  ngOnInit(): void {
    this.loadReservations();
  }

  private loadReservations() {
    this.reservationService.getUserReservations(this.guestId).subscribe((res) => {
      this.userReservations = res;
    })
  }

  cancel(id: string) {
    this.reservationService.cancelReservation(id).subscribe(
      (response) => {
        if (response) {
          this.loadReservations();
        } else {
          console.error('Failed to cancel reservation');
          window.alert("Sorry, You can't cancel a reservation the day before.");
        }
      },
      (error) => {
        console.error('Error canceling reservation', error);
        window.alert("Sorry, You can't cancel a reservation the day before.");
      }
    );
  }
}
