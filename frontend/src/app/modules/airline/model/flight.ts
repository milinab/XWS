import {Time} from "@angular/common";

export class Flight {
  id: string = '';
  departureDate: Date = new Date();
  arrivalDate: Date = new Date();
  departureTime: string = '';
  arrivalTime: string = '';
  departurePlace: string = '';
  arrivalPlace: string = '';
  price: number = 0;
  maxCapacity: number = 0;
  status: any;
  remainingTickets: number = 0;

  public constructor(obj?: any) {
    if (obj) {
      this.id = obj.id;
      this.departureDate = obj.departureDate;
      this.arrivalDate = obj.arrivalDate;
      this.departureTime = obj.departureTime;
      this.arrivalTime = obj.arrivalTime;
      this.departurePlace = obj.departurePlace;
      this.arrivalPlace = obj.arrivalPlace;
      this.price = obj.price;
      this.maxCapacity = obj.maxCapacity;
      this.status = obj.status;
      this.remainingTickets = obj.remainingTickets;
    }
  }
}
