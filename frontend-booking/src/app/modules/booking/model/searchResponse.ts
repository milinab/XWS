import {Accommodation} from "./accommodation";
import {AvailablePeriodDto} from "./availablePeriodDto";

export class SearchResponse {
  accomodation: Accommodation = new Accommodation();
  availablePeriod: AvailablePeriodDto = new AvailablePeriodDto();

  constructor(obj?: any) {
    if (obj) {
      this.accomodation = obj.accomodation;
      this.availablePeriod = obj.availablePeriod;
    }
  }
}
