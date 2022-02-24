import { Comment } from "./comment";
export class Post {
  public id: number;
  public author: string;
  public title: string;
  public content: string;
  public userId: number;
  public comments?: Comment[];
  public numberOfLikes: number;
  public numberOfDislikes: number;


  constructor(id: number, author: string,
    title: string, content: string, userId: number,comments: Comment[],
    numberOfLikes: number, numberOfDislikes: number, ) {
    this.id = id;
    this.author = author;
    this.title = title;
    this.content = content;
    this.userId=userId;
    this.comments = comments;
    this.numberOfLikes = numberOfLikes;
    this.numberOfDislikes = numberOfDislikes;

  }


}
