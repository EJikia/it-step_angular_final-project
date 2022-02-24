import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-dialog-box',
  templateUrl: './post-dialog-box.component.html',
  styleUrls: ['./post-dialog-box.component.css']
})
export class PostDialogBoxComponent implements OnInit {

  postForm = new FormGroup({});

  constructor(private postsService: PostsService, private formBuilder: FormBuilder, private router: Router) {
    this.postForm = formBuilder.group({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required)
    })
  }
  ngOnInit(): void {
  }
  addPost() {
    // const title = this.postForm.value.title;
    // const content = this.postForm.value.content;
    // this.postsService.setPosts(title, content).subscribe(post => {
    //   console.log("hi" + post)
    //   this.router.navigate(["/posts"])
    // })
  }
}
