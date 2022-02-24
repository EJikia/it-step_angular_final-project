import { Comment } from "./comment";
export class Post {

  public author: string | null;
  public title: string | null;
  public content: string | null;
  public userId: number | null;
  public comments?: Comment[] | null;
  public numberOfLikes: number | null;
  public numberOfDislikes: number | null;
  public id?: number | null;

  constructor( author: string | null,
    title: string | null, content: string | null, userId: number | null,comments: Comment[] | null,
    numberOfLikes: number | null, numberOfDislikes: number | null, id?: number | null ) {

    this.author = author;
    this.title = title;
    this.content = content;
    this.userId=userId;
    this.comments = comments;
    this.numberOfLikes = numberOfLikes;
    this.numberOfDislikes = numberOfDislikes;
    this.id = id;
  }


}
