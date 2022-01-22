import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-name-dialog',
  templateUrl: './name-dialog.component.html',
  styleUrls: ['./name-dialog.component.scss']
})
export class NameDialogComponent implements OnInit {

  @Output() show : EventEmitter<void>
  @Output() hide : EventEmitter<void>
  @Output() uploaded : EventEmitter<void>

  constructor() {
    this.show = new EventEmitter<void>()
    this.hide = new EventEmitter<void>()
    this.uploaded = new EventEmitter<void>()
  }

  ngOnInit(): void {
  }

  exit = () => this.hide.emit()

}
