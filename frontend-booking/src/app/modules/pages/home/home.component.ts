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

  wifi: Boolean = false;
  kitchen: Boolean = false;
  parking: Boolean = false;
  airConditioner: Boolean = false;


  searchRequest = {
    city: '',
    startDate: '',
    endDate: '',
    numberOfGuests: 0
  }

  searchResponse: Accommodation[] | undefined;
  showNoAccommodationsMessage: boolean = false;

  constructor(private accommodationService: AccommodationService, private reservationService: ReservationService, private authService: AuthService ) { }

  ngOnInit(): void {
    this.accommodationService.getAllAccommodations().subscribe(
      (result) => {
        this.searchResponse = result;
      }
    )
    console.log("Home Component nmOnInit()")
  }

  searchAccommodations() {
    this.accommodationService.searchAccommodations(this.searchRequest).subscribe((res) => {
      this.searchResponse = res;
      this.showNoAccommodationsMessage = this.searchResponse?.length === 0;
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
      status: 1,
      guestId: ''
    };


    this.reservationService.createReservation(newReservation).subscribe(
      (reservation) => {
        // Handle the success case here
        console.log("Reservation created successfully:", reservation);
        // You can also add logic to update UI or show a success message
      },
      (error) => {
        // Handle any errors that occur during the reservation creation
        console.error(error);
        // You can also show an error message to the user
      }
    );
  }
  submit() {

  }

  filter() {
    this.accommodationService.getAllAccommodations().subscribe(
      (result) => {
        this.searchResponse = result;
        this.searchResponse = this.searchResponse?.filter(item =>
          item.convenience.wifi === this.wifi &&
          item.convenience.kitchen === this.kitchen &&
          item.convenience.parking === this.parking &&
          item.convenience.airConditioner === this.airConditioner)
      }
    )



    console.log(this.searchResponse?.filter(item => item.convenience.wifi === this.wifi &&
      item.convenience.kitchen === this.kitchen &&
      item.convenience.wifi === this.parking &&
      item.convenience.airConditioner === this.airConditioner))
    console.log(this.wifi, this.kitchen, this.parking, this.airConditioner)
  }

  clear() {
    this.accommodationService.searchAccommodations(this.searchRequest).subscribe((res) => {
      this.searchResponse = res;
      this.showNoAccommodationsMessage = this.searchResponse?.length === 0;
    })
  }
}
