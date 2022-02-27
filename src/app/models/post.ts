import { Comment } from "./comment";
import { Reaction } from "./reaction";
import { User } from "./user";
export class Post {

  public title: string | null;
  public content: string | null;
  public userId?: number;
  public comments?: Comment[] | null;
  public isLiked?: Reaction;
  public date?: string | null | Date;
  public id?: number ;
  public user?: User;

  constructor(
    title: string | null, content: string | null,  userId?: number ,comments?: Comment[] | null,
    isLiked?: Reaction, date?: string | null | Date, id?: number, user?: User ) {

    this.title = title;
    this.content = content;
    this.userId=userId;
    this.comments = comments;
    this.isLiked = isLiked;
    this.date=date;
    this.id = id;
    this.user = user;
  }


}
