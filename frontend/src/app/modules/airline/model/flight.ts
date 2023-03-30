import {Time} from "@angular/common";

export interface Flight {
  id: string;
  departureDate: Date;
  arrivalDate: Date;
  departurePlace: string;
  arrivalPlace: string;
  price: number;
  maxCapacity: number;

}
