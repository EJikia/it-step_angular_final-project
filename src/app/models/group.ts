
export class Group {
  public creator: string;
  public title: string;
  public numOfMembers: number;
  public userId: string;
  public id?: number;

  constructor(creator: string, title: string, numOfMembers: number, userId: string, id: number ) {
    this.creator = creator;
    this.title = title;
    this.numOfMembers = numOfMembers;
    this.userId=userId;
    this.id = id;

  }

}
