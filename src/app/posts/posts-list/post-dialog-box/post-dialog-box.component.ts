import { Component, EventEmitter, Inject, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Post } from 'src/app/models/post';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { PostsService } from 'src/app/services/posts.service';
import { ShareDataService } from 'src/app/services/share-data.service';


@Component({
  selector: 'app-post-dialog-box',
  templateUrl: './post-dialog-box.component.html',
  styleUrls: ['./post-dialog-box.component.css']
})
export class PostDialogBoxComponent implements OnInit {

  //@Output() saveEventEmitter = new EventEmitter();

  postForm = new FormGroup({});
  @Input() isEditMode: boolean = false;
  @Input() post!: Post;
  title!: string;
  content!: string;
  subscription!: any;
  constructor(
    private postsService: PostsService,
    private authService: AuthService,
    private dataStorageService: DataStorageService,
    private formBuilder: FormBuilder,
    private router: Router,
    private dialogRef: MatDialogRef<any>,
    private shareDataService: ShareDataService,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {

    this.postForm = formBuilder.group({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required)
    })

  }
  ngOnInit(): void {
    this.checkEditMode()

  }

  checkEditMode() {
    if (this.data == null) {

    } else {
      this.subscription = this.shareDataService.getData().subscribe((res: boolean) => {
        this.isEditMode = res;
        console.log(this.isEditMode)
      })

      if (this.isEditMode) {
        this.postForm.setValue({
          title: this.data.title,
          content: this.data.content
        })
      }
    }
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
      this.postsService.addPost(post);
      this.dialogRef.close();

    }

  }
  onEditPost() {
    console.log('edit');

      const id: any = this.data.id
      const title = this.postForm.value.title;
      const content = this.postForm.value.content;
     const post = {
       id: id,
       title:title,
       content: content
     }
      this.postsService.updatePost(post);
      this.isEditMode = false;
      this.checkEditMode()
      this.dialogRef.close(post);
      // this.router.navigate(["posts"]).then(() => {
      //   window.location.reload();
      // });

    // const author = this.authService.username;
    // const post = new Post(title, content, author)
    // this.postsService.addPost(post);
    // this.dataStorageService.storePosts()
  }
  closeDialog() {
    this.isEditMode = false;
    this.checkEditMode()
    this.dialogRef.close(true);

  }

  submitForm() {
    if (this.isEditMode) {
      console.log("hi")
      this.onEditPost();
    }
    else {
      this.onAddPost();
    }
  }
}
