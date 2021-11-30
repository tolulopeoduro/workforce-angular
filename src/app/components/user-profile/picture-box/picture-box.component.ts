import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-picture-box',
  templateUrl: './picture-box.component.html',
  styleUrls: ['./picture-box.component.scss']
})
export class PictureBoxComponent implements OnInit {

  @Input() editable : boolean = false
  imgChangeDialog : boolean = true
  @Output() show : EventEmitter<void>

  constructor(private http : HttpService) { 
    this.show = new EventEmitter<void>()
  }
  @Input() imgUrl : any = null
  @Input() name : any = null

  ngOnInit(): void {
  }

  handleClick = () => this.show.emit()

}
