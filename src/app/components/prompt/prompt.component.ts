import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss']
})
export class PromptComponent implements OnInit {

  @Input() message : any = null; 
  @Output() accept : EventEmitter<any>
  @Output() decline : EventEmitter<void>

  constructor() {
    this.accept = new EventEmitter<any>()
    this.decline = new EventEmitter<void>()
   }

  ngOnInit(): void {
  }

  reply = (a : boolean) => {
    if (a) {
      this.accept.emit()
    } else {
      this.decline.emit()
    }
  }

}
