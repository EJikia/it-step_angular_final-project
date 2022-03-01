import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
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

posts!: Post[]
@Output() eventEmitter = new EventEmitter()
  constructor(private authService: AuthService, public router: Router, private postsService: PostsService) { }

  ngOnInit(): void {

  }
  loadPosts() {
    this.postsService.getPosts().subscribe(resData => {
      this.posts = resData;
      // this.posts.reverse();
    })
  }
  loggedIn() {
    return this.authService.loggedIn();

  }
  logout() {
    this.authService.logout()
    this.router.navigate(["/login"])
  }
}
