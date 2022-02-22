import { Comment } from "./comment";
import { Post } from "./post";
import { Group } from "./group";

export class User {
  constructor(
    public email: string,
    public password: string,
    public id: number,
    public username?: string,
    public firstName?: string,
    public lastName?: string,

    private _token?: string,
    private _tokenExpirationDate?: Date
  ) { }

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
