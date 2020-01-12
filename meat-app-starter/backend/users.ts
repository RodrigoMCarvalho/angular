export class User {
  constructor(
    public email: string,
    public name: string,
    private password: string
  ) {}

  matches(another: User): boolean {
    return another !== undefined &&
           another.email === this.email &&
           another.password === this.password
  }
}


export const users = {
  'admin@email.com': new User('admin@email.com', 'admin', '123'),
  'amanda@email.com': new User('amanda@email.com"', 'Amanda', '123'),
}
