import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { DataStorageService } from '../services/data-storage.service';
import { PostsService } from '../services/posts.service';

@Injectable({
  providedIn: 'root'
})
export class PostsResolverService {

  constructor(
    private dataStorageService: DataStorageService,
    private postsService: PostsService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const posts = this.postsService.getPosts();

    if (posts.length === 0) {
      return this.dataStorageService.fetchPosts();
    } else {
      return posts;
    }
  }
}
