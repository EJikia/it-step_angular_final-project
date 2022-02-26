import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Post } from 'src/app/models/post';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-dialog-box',
  templateUrl: './post-dialog-box.component.html',
  styleUrls: ['./post-dialog-box.component.css']
})
export class PostDialogBoxComponent implements OnInit {

  postForm = new FormGroup({});

  constructor(
    private postsService: PostsService,
    private authService: AuthService,
    private dataStorageService: DataStorageService,
    private formBuilder: FormBuilder,
    private router: Router,

  ) {

    this.postForm = formBuilder.group({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required)
    })

  }
  ngOnInit(): void {
  }
  addPost() {
if (!this.postForm.valid){
  return
}
    const title = this.postForm.value.title;
    const content = this.postForm.value.content;
    const post = new Post (title, content);
    this.postsService.addPost(post);
    this.router.navigate(["posts"]).then(() => {
      window.location.reload();
    });

    // const author = this.authService.username;
    // const post = new Post(title, content, author)
    // this.postsService.addPost(post);
    // this.dataStorageService.storePosts()
  }

  closeDialog(){
    this.router.navigate(["posts"])
  }
}
