import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-picture-box',
  templateUrl: './picture-box.component.html',
  styleUrls: ['./picture-box.component.scss']
})
export class PictureBoxComponent implements OnInit {

  constructor() { 

  }
  @Input() imgUrl : string = "https://res.cloudinary.com/dtuafcbbd/image/upload/v1636811647/workforce-v2/149071.png"
  @Input() name : string = "Tolu"

  ngOnInit(): void {
  }

}
