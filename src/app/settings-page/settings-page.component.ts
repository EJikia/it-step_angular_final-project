import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent implements OnInit {
  id!: number;
  username!: string;
  email!: string;
  firstName!: string;
  lastName!: string;

  userInfoForm = new FormGroup({});

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
    this.userInfoForm = formBuilder.group({
      email: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),


    })

  }

  ngOnInit(): void {
    this.loadUserData()

  }

  loadUserData() {
    // this.authService.getUserData().subscribe(userData => {
      this.id = this.authService.userId;
      this.email = this.authService.email;
      this.username = this.authService.username;
      this.firstName = this.authService.firstName;
      this.lastName = this.authService.lastName;
      console.log(this.email, this.username, this.firstName, this.lastName)

      this.userInfoForm.setValue({
        email: this.email,
        username: this.username,
        firstname: this.firstName,
        lastname: this.lastName,

      })
    // })
  }


  onSubmit() {
    console.log((this.userInfoForm.value.firstname))
    const newEmail = this.userInfoForm.value.email;
    const newUsername = this.userInfoForm.value.username;
    const newFirstName = this.userInfoForm.value.firstname;
    const newLastName = this.userInfoForm.value.lastname;
    this.authService.updateUser(this.id, newEmail, newUsername, newFirstName, newLastName);
  }

  onReset(){
    this.userInfoForm.setValue({
      email: this.email,
      username: this.username,
      firstname: this.firstName,
      lastname: this.lastName

    })


  }
}
