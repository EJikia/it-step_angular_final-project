import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Post } from '../models/post';
import { PostsService } from './posts.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  baseURL = "http://localhost:3000/posts"
  constructor(private http: HttpClient, private postsService: PostsService) { }

  storePosts() {
    const posts = this.postsService.getPosts();
    this.http
      .put(
        this.baseURL,
        posts
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchPosts() {
    return this.http
      .get<Post[]>(
        this.baseURL
      )
      .pipe(
        map(posts => {
          return posts.map(post => {
            return {
              ...post
            };
          });
        }),
        tap(posts => {
          console.log(posts)
          this.postsService.setPosts(posts);
        })
      )
  }
}
