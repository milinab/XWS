class Address {
  id: string = '';
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

export class Accommodation{
  id: string = '';
  name: string = '';
  address: Address = new Address();
  convenience: Convenience = new Convenience();
  photos: string[] = [];
  minNumberOfGuests: number = 0;
  maxNumberOfGuests: number = 0;


  public constructor(obj?: any) {
    if(obj){
     this.id = obj.id;
      this.name = obj.name;
      this.address = obj.address;
      this.convenience = obj.convenience;
      this.photos = obj.photos;
      this.minNumberOfGuests = obj.minNumberOfGuests;
      this.maxNumberOfGuests = obj.maxNumberOfGuests;
    }
  }
}

