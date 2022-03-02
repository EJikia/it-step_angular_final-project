import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';
import { Group } from 'src/app/models/group';
import { GroupsService } from 'src/app/services/groups.service';
import { GroupDialogBoxComponent } from '../groups-list/group-dialog-box/group-dialog-box.component';
@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit {
  myGroups!: Group[];
  userId = this.authService.userId;
  groups!: Group[];
  constructor(public dialog: MatDialog, private authService: AuthService, private groupsService: GroupsService) { }

  ngOnInit(): void {
    this.loadGroups()

  }

  loadGroups() {
    this.groupsService.getGroups().subscribe(resData => {
      this.groups = resData;
      this.myGroups = this.groups.filter(group => group.userId == this.userId || group.members?.find(user => user.id == this.userId))

    })

  }
  openDialog() {

    const dialogRef = this.dialog.open(GroupDialogBoxComponent, { width: '50%', disableClose: true });
    dialogRef.afterClosed().subscribe(
      () =>
        this.loadGroups()
    );
  }

}
