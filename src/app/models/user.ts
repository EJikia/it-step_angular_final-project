import { Comment } from "./comment";
import { Post } from "./post";
import { Group } from "./group";

export class User {
  constructor(
    public email: string,
    public firstName: string,
    public id: number,
    public lastName: string,
    public username: string,
    private accessToken: string
  ) {}

  get token() {
    if (!this.accessToken) {
      return null;
    }
    return this.accessToken;
  }
}
