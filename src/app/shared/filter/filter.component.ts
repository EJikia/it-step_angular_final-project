import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  value!: string;
  @Output() searchEvent = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }
  onClick(value:string){
    this.searchEvent.emit(value)
  }

}
