
export class Reaction {

  public isLiked: boolean;
  public userId?: number;
  public postId?: number;


  constructor(isLiked: boolean, userId?: number, postId?: number) {
    this.isLiked = isLiked;
    this.userId = userId;
    this.postId = postId;

  }
}
