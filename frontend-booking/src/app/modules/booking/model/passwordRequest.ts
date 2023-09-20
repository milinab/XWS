export class PasswordRequest {
  password: string = '';

  constructor(obj?: any) {
    if (obj) {
     this.password = obj.password;
    }
  }
}
