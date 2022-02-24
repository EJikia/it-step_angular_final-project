export class Comment {
  public author: string;
  public userId: number;
  public content: string;
  public id: number;
  public postId: number;

constructor(author: string, userId: number, content: string, id: number, postId: number) {
  this.author = author;
  this.userId = userId;
  this.content = content;
  this.id = id;
  this.postId = postId;


}

}
