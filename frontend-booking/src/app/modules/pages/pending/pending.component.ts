import { Component, OnInit } from '@angular/core';
import { Reservation } from '../../booking/model/reservation.model';
import { ReservationService } from '../../booking/services/reservation.service';
import {UserToken} from "../../booking/model/user-token.model";
import {TokenStorageService} from "../../booking/services/token-storage.service";

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css'],
})
export class PendingComponent implements OnInit {
  user: UserToken;
  reservations: Reservation[] = [];
  hostId: string | undefined = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private reservationService: ReservationService, private tokenStorageService: TokenStorageService) {
    this.user = this.tokenStorageService.getUser();
    this.hostId = this.tokenStorageService.getUser().id;
  }

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations() {
    this.reservationService.getAllReservations().subscribe(
      (reservations) => {
        // Filter reservations based on the hostId
        this.reservations = reservations.filter(
          (reservation) => reservation.hostId === this.hostId && reservation.status === 1
        );
        console.log(this.reservations)
      },
      (error) => {
        console.error('Error loading reservations:', error);
      }
    );
  }
  acceptReservation(reservation: Reservation) {
    this.reservationService.acceptReservation(reservation.id).subscribe(result => {
      alert("You accepted reservation!");
      window.location.reload();
    });
  }

  // Method to decline a reservation
  declineReservation(reservation: Reservation) {
    this.reservationService.declineReservation(reservation.id).subscribe(result => {
      alert("You declined reservation!");
      window.location.reload();
    });
  }
}
