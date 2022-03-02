import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostDialogBoxComponent } from './post-dialog-box/post-dialog-box.component';
import { PostsService } from '../../services/posts.service';
import { Post } from 'src/app/models/post';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { FilterService } from 'src/app/services/filter.service';


@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  @Output() postWasSelected = new EventEmitter<Post>();
  posts!: Post[]
  subscription!: Subscription;
  constructor(public dialog: MatDialog, private postsService: PostsService, private filterService: FilterService) { }

  ngOnInit(): void {
    this.loadPosts()
  }

  loadPosts() {
    this.postsService.getPosts().subscribe(resData => {
      this.posts = resData;
      this.posts.reverse();
    })
  }

  openDialog() {

    const dialogRef = this.dialog.open(PostDialogBoxComponent, { width: '50%', disableClose: true });
    dialogRef.afterClosed().subscribe(
      () =>
        this.loadPosts()
    );
  }

  onPostSelected(post: Post) {
    this.postWasSelected.emit(post);
  }


  setUpdatedPosts() {
    this.postsService.getPosts().subscribe(resData => {
      this.posts = resData;
      this.posts.reverse();
    })
  }

  filterPosts(title: string) {
    this.postsService.getPosts().subscribe(resData => {
      this.posts = resData;
      if (title !== "") {
        this.posts = this.filterService.filter(this.posts, title);
      } else {
        this.loadPosts();
      }
    })


  }
  newestToOldest() {
    if (typeof this.posts !== 'undefined' && this.posts.length > 0) {
      const sortedArray = this.posts.sort((a: any, b: any) => +new Date(b.date) - +new Date(a.date))
      return sortedArray
    } else {
      return
    }
  }

  oldestToNewest() {

    if (typeof this.posts !== 'undefined' && this.posts.length > 0) {
      const sortedPosts = this.posts.sort((a: any, b: any) => +new Date(a.date) - +new Date(b.date))
      return sortedPosts
    }
    else {
      return
    }
  }

}
