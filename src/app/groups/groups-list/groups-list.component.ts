import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GroupDialogBoxComponent } from '../groups-list/group-dialog-box/group-dialog-box.component';
@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit {
  links = ['title1', 'title2'];
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(GroupDialogBoxComponent, { width: '50%',  disableClose: true });
  }

}
