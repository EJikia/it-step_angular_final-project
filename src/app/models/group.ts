
export class Group {
  public creator: string;
  public groupId: string;
  public title: string;
  public numOfMembers: number;
  public userId: string;

  constructor(creator: string, groupId: string, title: string, numOfMembers: number, userId: string) {
    this.creator = creator;
    this.groupId = groupId;
    this.title = title;
    this.numOfMembers = numOfMembers;
    this.userId=userId;

  }

}
