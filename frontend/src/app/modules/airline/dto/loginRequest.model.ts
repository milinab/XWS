export class LoginRequest {
  username: string = '';
  password: string = '';

  public constructor(obj?: any) {
    if (obj) {
      this.username = obj.username;
      this.password = obj.password;
    }
  }
}
