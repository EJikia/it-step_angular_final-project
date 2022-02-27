import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostDialogBoxComponent } from './post-dialog-box/post-dialog-box.component';
import { PostsService } from '../../services/posts.service';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { Post } from 'src/app/models/post';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  @Output() postWasSelected = new EventEmitter<Post>();
  posts!: Post[]
  subscription!: Subscription;
  constructor(public dialog: MatDialog, private postsService: PostsService, private router: Router,
    private route: ActivatedRoute, private dataStorageService: DataStorageService, private authservice: AuthService) { }

  ngOnInit(): void {
    this.loadPosts()
    // this.subscription = this.postsService.postsChanged
    // .subscribe(
    //   (posts: Post[]) => {
    //     this.posts = posts;
    //     console.log(this.posts)
    //   }
    // );
    // this.posts = this.postsService.getPosts();

  }

  loadPosts() {
    this.postsService.getPosts().subscribe(resData => {
      this.posts = resData;
      this.posts.reverse();

    })

        console.log(this.posts+"loadshi")
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

  // onNewPosts() {
  //   this.router.navigate(['new'], {relativeTo: this.route});
  // }
  setUpdatedPosts() {
    console.log("Semoivda")
console.log (this.posts +"setupdateshi")
       this.loadPosts();
  }

}


