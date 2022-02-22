import { Comment } from "./comment";
export class Post {
  public postId: string;
  public author: string;
  public title: string;
  public content: string;
  public comments: Comment[];
  public numberOfLikes: number;
  public numberOfDislikes: number;
  public userId: string;

  constructor(postId: string, author: string,
    title: string, content: string, comments: Comment[],
    numberOfLikes: number, numberOfDislikes: number, userId: string) {
    this.postId = postId;
    this.author = author;
    this.title = title;
    this.content = content;
    this.comments = comments;
    this.numberOfLikes = numberOfLikes;
    this.numberOfDislikes = numberOfDislikes;
    this.userId=userId;
  }


}
