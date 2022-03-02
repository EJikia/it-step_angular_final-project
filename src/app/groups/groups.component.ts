import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Group } from '../models/group';
import { FilterService } from '../services/filter.service';
import { GroupsService } from '../services/groups.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  @Input() group!: Group;
  groups!: Group[];
  author = this.authService.username;
  numOfMembers!: any;
  @Input() index!: number;
  @Output() postSelected = new EventEmitter<void>();
  constructor(private groupsService: GroupsService,
    private authService: AuthService, private filterService: FilterService) { }

  ngOnInit(): void {
    this.loadGroups()

  }
  onclick(group: Group) {
    this.group = group;
  }
  loadGroups() {
    this.groupsService.getGroups().subscribe(resData => {
      this.groups = resData;
    });
  }
  filterPosts(title: string) {
    this.groupsService.getGroups().subscribe(resData => {
      this.groups = resData;
      if (title !== "") {
        this.groups = this.filterService.filter(this.groups, title);
      } else {
        this.loadGroups();
      }
    })
  }
  setUpdatedGroups() {
    this.groupsService.getGroups().subscribe(resData => {
      this.groups = resData;
    })
  }

}
