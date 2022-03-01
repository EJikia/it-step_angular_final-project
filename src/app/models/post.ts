import { Comment } from "./comment";
import { Reaction } from "./reaction";
import { User } from "./user";
export class Post {

  public title: string | null;
  public content: string | null;
  public userId?: number;
  public comments?: Comment[] | null;
  public reactions?: Reaction[] | null;
  public date?: string | Date;
  public id?: number ;
  public user?: User;

  constructor(
    title: string | null, content: string | null,  userId?: number ,comments?: Comment[] | null,
    reaction?: Reaction[] | null, date?: string | Date, id?: number, user?: User ) {

    this.title = title;
    this.content = content;
    this.userId=userId;
    this.comments = comments;
    this.reactions = reaction;
    this.date=date;
    this.id = id;
    this.user = user;
  }


}
