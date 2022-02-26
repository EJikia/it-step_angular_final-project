import { Component, OnInit, OnChanges } from '@angular/core';
import { Post } from '../models/post';
import { DataStorageService } from '../services/data-storage.service';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts!: Post[]

  constructor(private dataStorageService: DataStorageService, private postsService: PostsService) { }

  ngOnInit(): void {
    // this.dataStorageService.fetchPosts()
    this.loadPosts()

  }


  loadPosts() {
    this.postsService.getPosts().subscribe(resData => {
      this.posts = resData
      this.posts.reverse();
      console.log(this.posts)
    })
  }

}
