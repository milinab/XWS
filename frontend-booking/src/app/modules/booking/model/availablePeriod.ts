export class AvailablePeriod{
  start: Date = new Date();
  end: Date = new Date();
  price: number = 0;
  type: number = 0;
  accomodationId: string = '';


  constructor(obj?: any) {
    if (obj) {
      this.start = obj.start ? new Date(obj.start) : new Date();
      this.end = obj.end ? new Date(obj.end) : new Date();
      this.price = obj.price;
      this.type = obj.type;
      this.accomodationId = obj.accomodationId;
    }
  }
}


