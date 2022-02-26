import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Group } from 'src/app/models/group';

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

  ) {

    this.groupForm = formBuilder.group({
      title: new FormControl('', Validators.required)
    })

  }

  ngOnInit(): void {
  }
  closeDialog(){
    this.router.navigate(["posts"])
  }
  addGroup() {
    if (!this.groupForm.valid){
      return
    }
        // const title = this.groupForm.value.title;
        // const group = new Group (title);
        // this.groupService.addGroup(group);
        // this.router.navigate(["posts"]).then(() => {
        //   window.location.reload();
        // });
}
}
