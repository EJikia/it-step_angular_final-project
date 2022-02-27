import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { DataStorageService } from '../services/data-storage.service';
import { PostsService } from '../services/posts.service';

@Injectable({
  providedIn: 'root'
})
export class PostsResolverService {

  constructor(
    private postsService: PostsService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.postsService.getPost(route.params['id'])

  }
}
