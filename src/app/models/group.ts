import { User } from "./user";

export class Group {
  public title: string;
  public members?: User[] | null;
  public userId?: number;
  public id?: number;
  public user?: User;

  constructor(title: string, members?:User[] | null, userId?: number, id?: number,  user?: User) {
    this.title = title;
    this.members = members;
    this.userId=userId;
    this.id = id;
    this.user=user;

  }

}
