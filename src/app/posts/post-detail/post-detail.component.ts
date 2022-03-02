import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Post } from 'src/app/models/post';
import { Comment } from 'src/app/models/comment';
import { PostsService } from 'src/app/services/posts.service';
import * as alertyfy from 'alertifyjs';
import { Reaction } from 'src/app/models/reaction';
@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post!: Post
  numOfLikes!: number;
  numOfDislikes!: number;
  liked: boolean | null = null;
  userId!: number;
  commentForm = new FormGroup({});
  isEditMode = false;
  constructor(private postsService: PostsService, private authService: AuthService,
    private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router) {

    this.commentForm = formBuilder.group({
      content: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
    this.userId = this.authService.userId;
    this.loadPost()
    this.reactionsCounter();
    this.checkUserReaction();

  }


  checkUserReaction() {
    let postReactions = this.post.reactions;
    let userReaction = postReactions?.find(i => i.userId == this.userId);
    if (userReaction == undefined || userReaction == null) {
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

  loadPost() {
    this.route.data.subscribe(data => {
      this.post = data['post']
    })

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

addComment() {

  const author = this.authService.username;
  const userId = this.authService.userId;
  const content = this.commentForm.value.content;
  const postId: any = this.post.id;
  const comment = new Comment(author, userId, content, postId)
  this.post.comments?.push(comment);

  this.postsService.updatePost(this.post);
  this.commentForm.reset();

}
onDelete() {
  const id: any = this.post.id
  this.postsService.deletePost(id);
  this.router.navigate(["posts"])

}

onEdit() {
  this.isEditMode = true;

}
onSave(form: NgForm) {
  if (!form.valid) {
    return;
  }
  const title = form.value.title;
  const content = form.value.content;
  this.post.title = title;
  this.post.content = content;
  this.postsService.updatePost(this.post);
  alertyfy.success("Post successfully updated");
  this.isEditMode = false;

}
onCancel(content: HTMLTextAreaElement, title: HTMLInputElement) {
  content.value = this.post.content ?? '';
  title.value = this.post.title ?? '';
  this.isEditMode = false;
}
}
