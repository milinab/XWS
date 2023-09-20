import { Component, OnInit } from '@angular/core';
import {Accommodation} from "../../booking/model/accommodation";
import {AccommodationService} from "../../booking/services/accommodation.service";
import {ReservationService} from "../../booking/services/reservation.service";
import {Reservation} from "../../booking/model/reservation.model";
import { v4 as uuidv4 } from 'uuid';
import {AuthService} from "../../booking/services/auth.service";
import {TokenStorageService} from "../../booking/services/token-storage.service";
import {AvailablePeriodDto} from "../../booking/model/availablePeriodDto";
import {SearchResponse} from "../../booking/model/searchResponse";

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

  accommodations: Accommodation[] = [];
  searchResponse: SearchResponse[] = [];
  showNoAccommodationsMessage: boolean = false;

  constructor(private tokenStorageService: TokenStorageService, private accommodationService: AccommodationService, private reservationService: ReservationService, private authService: AuthService ) { }

  ngOnInit(): void {
  }

  searchAccommodations() {
    this.accommodationService.searchAccommodations(this.searchRequest).subscribe((res) => {
      this.searchResponse = res;
      console.log(res)
      console.log("----")
      console.log(this.searchResponse);
      this.showNoAccommodationsMessage = this.searchResponse?.length === 0;
    })
  }

  createReservation(accomodation: Accommodation) {
    const newReservation: Reservation = {
      id: uuidv4(),
      created: new Date(),
      startDate: new Date(this.searchRequest.startDate),
      endDate: new Date(this.searchRequest.endDate),
      accomodationId: accomodation.id,
      guestUsername: "Anonymous",
      canceled: false,
      hostId: accomodation.hostId,
      status: accomodation.isAutomatic ? 0 : 1, // Set status based on isAutomatic
      guestId: this.tokenStorageService.getUser().id
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
    this.searchResponse = this.searchResponse?.filter(item =>
      item.accomodation.convenience.wifi === this.wifi &&
      item.accomodation.convenience.kitchen === this.kitchen &&
      item.accomodation.convenience.parking === this.parking &&
      item.accomodation.convenience.airConditioner === this.airConditioner)
  }

  clear() {
    this.accommodationService.searchAccommodations(this.searchRequest).subscribe((res) => {
      this.searchResponse = res;
      this.showNoAccommodationsMessage = this.searchResponse?.length === 0;
    })
  }

  calculatePrice(availablePeriod: AvailablePeriodDto): number {
    var startDateVar = new Date(this.searchRequest.startDate);
    var endDateVar = new Date(this.searchRequest.endDate);
    var nights = Math.abs(endDateVar.getTime() - startDateVar.getTime()) / (1000 * 60 * 60 * 24);
    if(availablePeriod.type == 0) {
      return availablePeriod.price*this.searchRequest.numberOfGuests*nights
    } else {
      return availablePeriod.price*nights
    }
  }
}
