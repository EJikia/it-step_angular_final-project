import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class PostsService {
  // postsChanged = new Subject<Post[]>();

  // private posts: Post[] = [];

  baseURL = "http://localhost:3000/posts"
  constructor( private authService: AuthService, private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseURL)
   }

   addPost(post: Post){
     post.author=this.authService.username;
     post.userId=this.authService.userId;
     post.comments=[];
     post.numberOfLikes=0;
     post.numberOfDislikes=0;
     post.date= new Date()
    return this.http.post(this.baseURL,post).subscribe(resData => {
    console.log(resData)
    })
   }
  // setPosts(posts: Post[]) {
  //   this.posts = posts;
  //   this.postsChanged.next(this.posts.slice());
  // }
  //

  // getPosts() {
  //   return this.posts.slice();
  // }

  // getPost(index: number) {
  //   return this.posts[index];
  // }

  // addPost(post: Post) {
  //   this.posts.push(post);
  //   this.postsChanged.next(this.posts.slice());
  // }

  // updatePost(index: number, newPost: Post) {
  //   this.posts[index] = newPost;
  //   this.postsChanged.next(this.posts.slice());
  // }

  // deletePost(index: number) {
  //   this.posts.splice(index, 1);
  //   this.postsChanged.next(this.posts.slice());
  // }


}
