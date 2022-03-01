import { Component, OnInit, OnChanges } from '@angular/core';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor( private postsService: PostsService) { }

  ngOnInit(): void {


  }



}
