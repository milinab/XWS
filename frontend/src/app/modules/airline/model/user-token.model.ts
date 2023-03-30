export class UserToken {
  sub: string = '';
  role: number = 0;

  constructor(sub: string, role: number ) {
    this.sub = sub;
    this.role = role;
  }
}
