import { Component, OnInit } from '@angular/core';
import { Reservation } from '../../booking/model/reservation.model';
import { ReservationService } from '../../booking/services/reservation.service';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css'],
})
export class PendingComponent implements OnInit {
  reservations: Reservation[] = [];
  hostId: string | undefined = 'a270af8a-f0ef-4411-8679-4bd59f464142'; // Add your desired hostId here

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations() {
    this.reservationService.getAllReservations().subscribe(
      (reservations) => {
        // Filter reservations based on the hostId
        this.reservations = reservations.filter(
          (reservation) => reservation.hostId === this.hostId
        );
      },
      (error) => {
        console.error('Error loading reservations:', error);
      }
    );
  }
}
