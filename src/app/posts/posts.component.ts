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

  constructor(private dataStorageService: DataStorageService, private postsService: PostsService) { }

  ngOnInit(): void {


  }



}
