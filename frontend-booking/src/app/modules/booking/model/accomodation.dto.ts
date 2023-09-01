class Address {
  streetName: string = '';
  streetNumber: string = '';
  postalCode: string = '';
  city: string = '';
  country: string = '';
}

class Convenience {
  wifi: boolean = false;
  kitchen: boolean = false;
  airConditioner: boolean = false;
  parking: boolean = false;
}

export class AccommodationDto{
  name: string = '';
  description: string = '';
  address: Address = new Address();
  convenience: Convenience = new Convenience();
  photos: string[] = [];
  minNumberOfGuests: number = 0;
  maxNumberOfGuests: number = 0;


  public constructor(obj?: any) {
    if(obj){
      this.name = obj.name;
      this.description = obj.description;
      this.address = obj.address;
      this.convenience = obj.convenience;
      this.photos = obj.photos;
      this.minNumberOfGuests = obj.minNumberOfGuests;
      this.maxNumberOfGuests = obj.maxNumberOfGuests;
    }
  }
}
