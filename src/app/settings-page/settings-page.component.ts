import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent implements OnInit {
username: string ='';
email: string ='';
firstName: string ='';
lastName: string ='';
password: string ='';

  constructor(private authService: AuthService) {


   }

  ngOnInit(): void {
      this.authService.user.subscribe(userData => {
      this.username=userData.username;
      this.email=userData.email,
      this.firstName=userData.firstName,
      this.lastName=userData.lastName

    })
    console.log('hello'+this.username)

  }

}
