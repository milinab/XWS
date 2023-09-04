export class GradeAccomodationDto {
  accomodationId: string = '';
  guestId: string = '';
  guestUsername: string = '';
  value: number = 0;
  created: Date = new Date();

  constructor(obj?: any) {
    if (obj) {
      this.accomodationId = obj.accomodationId;
      this.guestUsername = obj.guestUsername;
      this.guestId = obj.guestId;
      this.value = obj.value;
      this.created = obj.created ? new Date(obj.created) : new Date();
    }
  }

  validate(): boolean {
    return this.value >= 1 && this.value <= 5;
  }
}
