import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';
import { Comment } from '../models/comment';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
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
    post.date = new Date().toDateString();
    console.log(post);
    return this.http.post(this.postsURL, post).subscribe();

  }

  deletePost(id: number) {
    this.http.delete(`${this.postsURL}/${id}`).subscribe();
  }
  // id: number, title: string, content: string
  updatePost(post: Post) {
    return this.http.patch(`${this.postsURL}/${post.id}`, post).subscribe(data => {
      console.log(data)
    })

  }
  getPost(id: number) {
    return this.http.get<Post>(`${this.postsURL}/${id}`)
  }
  getComments() {
    return this.http.get(this.commentsURL);
  }

}
