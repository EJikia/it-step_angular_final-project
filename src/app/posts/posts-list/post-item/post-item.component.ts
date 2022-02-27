import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { ShareDataService } from 'src/app/services/share-data.service';
import { Post } from '../../../models/post';
import { PostDialogBoxComponent } from '../post-dialog-box/post-dialog-box.component';
import { take, first} from 'rxjs/operators'
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
  constructor(private router: Router,
    private postsService: PostsService,
    public dialog: MatDialog,
    private shareDataService: ShareDataService) { }

  ngOnInit(): void {
  }
  onSelected() {


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
    dialogRef.afterClosed().subscribe(res=>
      {
        this.postSelected.emit()
      });

  }
}
