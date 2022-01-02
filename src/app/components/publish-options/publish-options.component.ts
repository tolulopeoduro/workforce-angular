import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-publish-options',
  templateUrl: './publish-options.component.html',
  styleUrls: ['./publish-options.component.scss']
})
export class PublishOptionsComponent implements OnInit {
  @Output() accept : EventEmitter<any>
  @Output() decline : EventEmitter<void>

  constructor() {
    this.accept = new EventEmitter<any>()
    this.decline = new EventEmitter<void>()
  }

  ngOnInit(): void {
  }

}
