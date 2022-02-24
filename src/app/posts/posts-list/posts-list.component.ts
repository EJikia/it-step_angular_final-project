import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostDialogBoxComponent } from './post-dialog-box/post-dialog-box.component';
import { PostsService } from '../../services/posts.service';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { Post } from 'src/app/models/post';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  @Output() postWasSelected = new EventEmitter<Post>();
  posts!: Post[];
  subscription!: Subscription;
  constructor(public dialog: MatDialog, private postsService: PostsService, private router: Router,
    private route: ActivatedRoute, private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.dataStorageService.fetchPosts().subscribe(res =>{
      return
   });
    this.subscription = this.postsService.postsChanged
      .subscribe(
        (posts: Post[]) => {
          this.posts = posts;
          console.log(this.posts)
        }
      );
    this.posts = this.postsService.getPosts();
    console.log(this.posts)
  }

  openDialog() {
    this.dialog.open(PostDialogBoxComponent, { width: '50%' });
  }

  onPostSelected(post: Post) {
    this.postWasSelected.emit(post);
  }

  onNewPosts() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
