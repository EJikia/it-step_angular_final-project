import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Post } from '../models/post';
import { PostsService } from './posts.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  baseURL = "http://localhost:3000/posts"
  constructor(private http: HttpClient, private postsService: PostsService, private authService: AuthService) { }

  // storePosts() {
  //   const posts = this.postsService.getPosts();
  //   this.http
  //     .post(
  //       this.baseURL,
  //       posts
  //     )
  //     .subscribe(response => {
  //       console.log(response)
  //     });
  // }

  // fetchPosts() {
  //   return this.http
  //     .get<Post[]>(
  //       this.baseURL
  //     )
  //     .pipe(
  //       map(posts => {
  //         return posts.map(post => {
  //           const author = this.authService.username;
  //           const userId = this.authService.userId;
  //           return {
  //             ...post,
  //             userId: userId,
  //             comments: post.comments ? post.comments : [],
  //             numberOfLikes: post.numberOfLikes ? post.numberOfLikes : 0,
  //             numberOfDislikes: post.numberOfDislikes ? post.numberOfDislikes : 0,

  //           };
  //         });
  //       }),
  //       tap(posts => {
  //         console.log(posts)
  //         this.postsService.setPosts(posts);
  //       })
  //     )
  // }
}
