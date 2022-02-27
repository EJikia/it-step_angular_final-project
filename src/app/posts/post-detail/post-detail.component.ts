import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Post } from 'src/app/models/post';
import { Comment } from 'src/app/models/comment';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post!: Post
  commentForm = new FormGroup({});

  constructor(private postsService: PostsService, private authService: AuthService,
    private route: ActivatedRoute, private formBuilder: FormBuilder) {

    this.commentForm = formBuilder.group({
      content: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
    this.loadPost()
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


}
