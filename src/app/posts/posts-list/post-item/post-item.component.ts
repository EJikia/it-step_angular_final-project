import { Component, Input, OnInit, EventEmitter, Output, ViewChild, AbstractType } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { ShareDataService } from 'src/app/services/share-data.service';
import { Post } from '../../../models/post';
import { PostDialogBoxComponent } from '../post-dialog-box/post-dialog-box.component';
import { AuthService } from 'src/app/auth/auth.service';
import { Reaction } from 'src/app/models/reaction';
import * as alertyfy from 'alertifyjs';
@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {
  @Input() post!: Post;
  @Input() index!: number;
  @Output() postSelected = new EventEmitter<void>();
  @Output() isEditMode!: boolean;
  numOfLikes!: number;
  numOfDislikes!: number;
  liked: boolean | null = null;
  userId!: number;

  constructor(private router: Router,
    private postsService: PostsService,
    private authService: AuthService,
    public dialog: MatDialog,
    private shareDataService: ShareDataService) { }

  ngOnInit(): void {
    this.reactionsCounter();
    this.checkUserReaction();
    this.userId = this.authService.userId;
  }
  checkUserReaction() {
    let postReactions = this.post.reactions;
    let userReaction = postReactions?.find(i => i.userId == this.userId);
    if (userReaction == undefined) {
      this.liked = null;
    }
    this.liked = <any>userReaction?.isLiked;
  }
  reactionsCounter() {
    const reactions = this.post.reactions;
    if (reactions != null || reactions != undefined) {
      let numOfLikes = reactions.filter(i => i.isLiked);
      this.numOfLikes = numOfLikes.length;
      this.numOfDislikes = reactions.length - this.numOfLikes;
    } else {
      this.numOfDislikes = 0;
      this.numOfLikes = 0;
    }


  }
  onDelete() {
    const id: any = this.post.id
    this.postsService.deletePost(id);
    this.postSelected.emit()
  }

  onEdit() {
    this.shareDataService.sendData(true)
    const dialogRef = this.dialog.open(PostDialogBoxComponent, {
      width: '50%', disableClose: true,
      data: { id: this.post.id, title: this.post.title, content: this.post.content, isEditMode: true }
    });
    dialogRef.afterClosed().subscribe(res => {
      this.postSelected.emit()
    });

  }

  onReactionClicked(isLike: boolean) {

    const userId = this.authService.userId;
    const reaction = this.post.reactions?.find(i => i.userId == userId);
    if (reaction != null || reaction != undefined) {
      reaction.isLiked = isLike;
      this.postsService.updatePost(this.post);
    } else {
      const reaction = new Reaction(true, userId);
      this.post.reactions?.push(reaction);
      this.postsService.updatePost(this.post);

    }
    this.liked = isLike;
    this.reactionsCounter()
  }


}
