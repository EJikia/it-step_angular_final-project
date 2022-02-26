import { Component, EventEmitter, OnInit,Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  //@Output() saveEventEmitter = new EventEmitter();

  postForm = new FormGroup({});

  constructor(
    private postsService: PostsService,
    private authService: AuthService,
    private dataStorageService: DataStorageService,
    private formBuilder: FormBuilder,
    private router: Router,
    private dialogRef: MatDialogRef<any>


  ) {

    this.postForm = formBuilder.group({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required)
    })

  }
  ngOnInit(): void {
  }
  onAddPost() {
    console.log('forma');
    if (!this.postForm.valid) {
      console.log("shemovida invalid")
      return

    } else {
      const title = this.postForm.value.title;
      const content = this.postForm.value.content;
      const post = new Post(title, content);
      console.log(post)
      console.log("shemovida" + title)
      this.postsService.addPost(post);
      this.dialogRef.close();
      // this.router.navigate(["posts"]).then(() => {
      //   window.location.reload();
      // });
    }
    // const author = this.authService.username;
    // const post = new Post(title, content, author)
    // this.postsService.addPost(post);
    // this.dataStorageService.storePosts()
  }

  closeDialog() {
      this.dialogRef.close(true);

  }
}
