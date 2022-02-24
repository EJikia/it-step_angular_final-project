import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../../../models/post';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {
  @Input() post!: Post;
  @Input() index!: number;
  @Output() postSelected = new EventEmitter<void>();
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSelected() {
    this.postSelected.emit();
    this.router.navigate(["id"])
  }
}
