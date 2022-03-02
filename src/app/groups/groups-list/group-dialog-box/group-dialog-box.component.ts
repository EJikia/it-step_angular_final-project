import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Group } from 'src/app/models/group';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-group-dialog-box',
  templateUrl: './group-dialog-box.component.html',
  styleUrls: ['./group-dialog-box.component.css']
})
export class GroupDialogBoxComponent implements OnInit {


  groupForm = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private groupsService: GroupsService,
    private dialogRef: MatDialogRef<any>,


  ) {

    this.groupForm = formBuilder.group({
      title: new FormControl('', Validators.required)
    })

  }

  ngOnInit(): void {
  }


  closeDialog() {

    this.dialogRef.close(true);
  }

  addGroup() {
    if (!this.groupForm.valid) {
      return

    } else {
      const title = this.groupForm.value.title;
      const group = new Group(title);
      this.groupsService.addGroup(group);
      this.dialogRef.close();

    }

  }
}
