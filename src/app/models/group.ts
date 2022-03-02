import { User } from "./user";

export class Group {
  public title: string;
  public members?: User[] | null;
  public userId?: number;
  public id?: number;

  constructor(title: string, members?:User[] | null, userId?: number, id?: number ) {
    this.title = title;
    this.members = members;
    this.userId=userId;
    this.id = id;

  }

}
