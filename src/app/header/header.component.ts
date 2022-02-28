import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  links = ['posts', 'groups'];
  activeLink = this.links[0];
  background: ThemePalette = undefined;

  toggleBackground() {
    this.background = this.background ? undefined : 'primary';
  }

  addLink() {
    this.links.push(`Link ${this.links.length + 1}`);
  }
  constructor(private authService: AuthService, public router: Router) { }

  ngOnInit(): void {

  }
  loggedIn(){
    return this.authService.loggedIn();

  }
  logout() {
    this.authService.logout()
    this.router.navigate(["/login"])
  }
}
