import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Group } from 'src/app/models/group';
import { User } from 'src/app/models/user';
import { FilterService } from 'src/app/services/filter.service';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.css']
})
export class GroupItemComponent implements OnInit {
  @Input() group!: Group;
  @Input() index!: number;
  @Output() updateEvent = new EventEmitter()
  userId = this.authService.userId;
  groups!: Group[];
  author = this.authService.username;
  numOfMembers!: number;
  isJoined!: null | boolean;
  user!: User;
  constructor(private groupsService: GroupsService,
    private authService: AuthService, private filterService: FilterService) { }


  ngOnInit(): void {

    this.loadGroups()
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.checkMembership()
  }

  loadGroups() {
    this.groupsService.getGroups().subscribe(resData => {
      this.groups = resData;
    });
  }


  onDelete() {
    const id: any = this.group.id
    this.groupsService.deleteGroup(id);
    this.updateEvent.emit()
  }

  checkMembership() {
    let memberships = this.group.members;
    let isJoined = memberships?.find(i => i.id == this.userId);

    if (isJoined == undefined) {
      this.isJoined = null;
    } else {
      this.isJoined = true;
    }
  }

  onJoinClicked() {

    const membership = this.group.members?.find(i => i.id == this.userId);
    if (membership == null || membership == undefined) {
      this.group.members?.push(this.user)
      this.groupsService.updateGroup(this.group);
      this.isJoined = true;
    } else {
      this.isJoined = null;
    }

  }
  onLeaveClicked() {

    const newMembers = this.group.members?.filter((user) => user.id !== this.userId);
    this.group.members = newMembers;
    this.groupsService.updateGroup(this.group);
    this.isJoined = false;
  }



}
