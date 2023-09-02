export class Reservation {
  id: string = '';
  created: Date = new Date();
  startDate: Date = new Date();
  endDate: Date = new Date();
  accomodationId: string = '';
  guestUsername: string = '';
  canceled: boolean = false;
  status: string = '';
  hostId: string = '';

  constructor(obj?: any) {
    if (obj) {
      this.id = obj.id;
      this.created = obj.created ? new Date(obj.created) : new Date();
      this.startDate = obj.startDate ? new Date(obj.startDate) : new Date();
      this.endDate = obj.endDate ? new Date(obj.endDate) : new Date();
      this.accomodationId = obj.accomodationId;
      this.guestUsername = obj.guestUsername;
      this.canceled = obj.canceled || false;
      this.hostId = obj.hostId;
      this.status = obj.status;
    }
  }
}
