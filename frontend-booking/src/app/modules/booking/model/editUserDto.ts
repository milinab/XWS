export class EditUserDto {
  id: string = '';
  firstName: string = '';
  lastName: string = '';
  username: string = '';

  constructor(obj?: any) {
    if (obj) {
      this.id = obj.id;
     this.firstName = obj.firstName;
     this.lastName = obj.lastName;
     this.username = obj.username;
    }
  }
}
