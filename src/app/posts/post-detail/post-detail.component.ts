import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Post } from 'src/app/models/post';
import { Comment } from 'src/app/models/comment';
import { PostsService } from 'src/app/services/posts.service';
import * as alertyfy from 'alertifyjs';
@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post!: Post
  commentForm = new FormGroup({});
  isEditMode = false;
  constructor(private postsService: PostsService, private authService: AuthService,
    private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router) {

    this.commentForm = formBuilder.group({
      content: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
    this.loadPost()
    console.log(this.post)
  }
  loadPost() {
    this.route.data.subscribe(data => {
      this.post = data['post']
    })
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
    content.value=this.post.content ?? '';
    title.value=this.post.title ?? '';
    this.isEditMode = false;
  }
}
