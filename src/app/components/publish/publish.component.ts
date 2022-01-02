import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss']
})
export class PublishComponent implements OnInit {

  @Output() accept : EventEmitter<any>
  @Output() decline : EventEmitter<void>

  @Input() prv_title : string = ""
  @Input() prv_sub : string

  constructor() {
    this.accept = new EventEmitter<any>()
    this.decline = new EventEmitter<void>()
  }

  ngOnInit(): void {
    console.log(this.prv_title)
  }

  done = () => this.accept.emit()
  stop = () => this.decline.emit()

  
}
