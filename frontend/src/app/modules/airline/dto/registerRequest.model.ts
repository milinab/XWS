export class RegisterRequest {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  username: string = '';
  password: string = '';

  public constructor(obj?: any) {
    if (obj) {
      this.firstName = obj.firstName;
      this.lastName = obj.lastName;
      this.email = obj.email;
      this.username = obj.username;
      this.password = obj.password;
    }
  }
}
