
export class Reaction {

  public isLiked: boolean | null;
  public userId?: number;


  constructor(isLiked: boolean | null, userId?: number) {
    this.isLiked = isLiked;
    this.userId = userId;

  }
}
