export class User {
  constructor(
    public email: string,
    public firstName: string,
    public lastName: string,
    public username: string,
    public accessToken: string,
    public id?: number

  ) { }

  // get token() {
  //   if (!this.accessToken) {
  //     return null;
  //   }
  //   return this.accessToken;
  // }


}
