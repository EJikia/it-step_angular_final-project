import { Comment } from "./comment";
export class Post {

  public title: string | null;
  public content: string | null;
  public author?: string | null;
  public userId?: number | null;
  public comments?: Comment[] | null;
  public numberOfLikes?: number;
  public numberOfDislikes?: number | null;
  public date?: string | null | Date;
  public id?: number ;

  constructor(
    title: string | null, content: string | null, author?: string | null, userId?: number | null,comments?: Comment[] | null,
    numberOfLikes?: number, numberOfDislikes?: number | null, date?: string | null | Date, id?: number ) {

    this.author = author;
    this.title = title;
    this.content = content;
    this.userId=userId;
    this.comments = comments;
    this.numberOfLikes = numberOfLikes;
    this.numberOfDislikes = numberOfDislikes;
    this.date=date;
    this.id = id;
  }


}
