export class Comment {
  public author: string;
  public userId: number;
  public content: string;
  public postId: number;
  public id?: number;


constructor(author: string, userId: number, content: string, id: number, postId: number) {
  this.author = author;
  this.userId = userId;
  this.content = content;
  this.postId = postId;
  this.id = id;



}

}
