export class AvailablePeriodDto{
  start: Date = new Date();
  end: Date = new Date();
  price: number = 0;
  type: number = 0;
  accomodationId: string = '';
  id: string = '';


  constructor(obj?: any) {
    if (obj) {
      this.start = obj.start ? new Date(obj.start) : new Date();
      this.end = obj.end ? new Date(obj.end) : new Date();
      this.price = obj.price;
      this.type = obj.type;
      this.accomodationId = obj.accomodationId;
      this.id = obj.id;
    }
  }
}
