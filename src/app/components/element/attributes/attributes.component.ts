import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.scss']
})
export class AttributesComponent implements OnInit {
  
  @Input() element : any = null;
  @Output() hide: EventEmitter<void>;

  constructor() { 
    this.hide = new EventEmitter<void>()
  }

  ngOnInit(): void {
  }

  changeType = (value : any) => {
    this.element.type = value
    this.hide.emit()
  }


}
