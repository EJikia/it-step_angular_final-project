import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';
import { Comment } from '../models/comment';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import * as alertyfy from 'alertifyjs';
@Injectable({
  providedIn: 'root'
})
export class PostsService {
  // postsChanged = new Subject<Post[]>();

  // private posts: Post[] = [];
  getPostsURL = "http://localhost:3000/posts?_expand=user"
  postsURL = "http://localhost:3000/posts"
  commentsURL = "http://localhost:3000/posts"
  constructor(private authService: AuthService, private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.getPostsURL)
  }

  addPost(post: Post) {
    post.userId = this.authService.userId;
    post.comments = [];
    post.reactions = [];
    post.date = new Date().toLocaleString('en-US', {
      weekday: 'short',
      day: 'numeric',
      year: 'numeric',
      month: 'long',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });
    return this.http.post(this.postsURL, post).subscribe(res => {
      alertyfy.success('successfully added');
    });
  }

  deletePost(id: number) {
    return this.http.delete(`${this.postsURL}/${id}`).subscribe(res => {
      alertyfy.success('successfully deleted');
    });
  }

  updatePost(post: Post) {
    return this.http.patch(`${this.postsURL}/${post.id}`, post).subscribe(data => {
  })

  }
  getPost(id: number) {
    return this.http.get<Post>(`${this.postsURL}/${id}?_expand=user`)
  }
  getComments() {
    return this.http.get(this.commentsURL);
  }

}
