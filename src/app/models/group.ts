
export class Group {
  public creator: string;
  public id: string;
  public title: string;
  public numOfMembers: number;
  public userId: string;

  constructor(creator: string, id: string, title: string, numOfMembers: number, userId: string) {
    this.creator = creator;
    this.id = id;
    this.title = title;
    this.numOfMembers = numOfMembers;
    this.userId=userId;

  }

}
