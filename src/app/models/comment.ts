export class Comment {
  public author: string;
  public userId: string;
  public content: string;
  public commentId: string;
  public postId: string;

constructor(author: string, userId: string, content: string, commentId: string, postId: string) {
  this.author = author;
  this.userId = userId;
  this.content = content;
  this.commentId = commentId;
  this.postId = postId;


}

}
