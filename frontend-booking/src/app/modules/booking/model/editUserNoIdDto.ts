export class EditUserNoIdDto {
  firstName: string = '';
  lastName: string = '';
  username: string = '';

  constructor(obj?: any) {
    if (obj) {
      this.firstName = obj.firstName;
      this.lastName = obj.lastName;
      this.username = obj.username;
    }
  }
}
