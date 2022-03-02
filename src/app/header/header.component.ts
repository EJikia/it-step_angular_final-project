import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Post } from '../models/post';
import { PostsService } from '../services/posts.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private authService: AuthService, public router: Router, private postsService: PostsService) { }

  ngOnInit(): void {

  }

  loggedIn() {
    return this.authService.loggedIn();

  }
  logout() {
    this.authService.logout()
    this.router.navigate(["/login"])
  }
}
