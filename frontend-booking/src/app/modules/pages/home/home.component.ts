import { Component, OnInit } from '@angular/core';
import {Accommodation} from "../../booking/model/accommodation";
import {AccommodationService} from "../../booking/services/accommodation.service";
import {ReservationService} from "../../booking/services/reservation.service";
import {Reservation} from "../../booking/model/reservation.model";
import { v4 as uuidv4 } from 'uuid';
import {AuthService} from "../../booking/services/auth.service";

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

  constructor(private accommodationService: AccommodationService, private reservationService: ReservationService, private authService: AuthService ) { }

  ngOnInit(): void {
    console.log("Home Component nmOnInit()")
  }

  searchAccommodations() {
    this.accommodationService.searchAccommodations(this.searchRequest).subscribe((res) => {
      this.searchResponse = res;
    })
  }

  createReservation(accomodation: Accommodation) {
    const newReservation: Reservation = {
      id: uuidv4(), // You can generate a new GUID if needed
      created: new Date(),
      startDate: new Date(this.searchRequest.startDate),
      endDate: new Date(this.searchRequest.endDate),
      accomodationId: accomodation.id,
      guestUsername: "guest_username_here", // Replace with the actual guest username
      canceled: false,
      hostId: '',
      status: 'PENDING'
    };


    this.reservationService.createReservation(newReservation).subscribe(
      (reservation) => {
        // Handle the success case here
        console.log("Reservation created successfully:", reservation);
        // You can also add logic to update UI or show a success message
      },
      (error) => {
        // Handle any errors that occur during the reservation creation
        console.error("Error creating reservation:", error);
        // You can also show an error message to the user
      }
    );
  }
  submit() {

  }

}
