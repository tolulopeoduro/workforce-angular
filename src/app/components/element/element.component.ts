import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';


@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss']
})

export class ElementComponent implements OnInit {

  constructor() { 
    this.update = new EventEmitter<any>();
  }

  @Output() update : EventEmitter<any>;
  @ViewChild('myInput') inputText : any;
  @Input() element : any = null;
  @Input() i : any = null;
  @Input() editing : boolean = false;
  
  

  ngOnInit(): void {
    setTimeout(() => {
      const c =document.getElementById(`element${this.i}`)
      if (c) {
        c.textContent = this.element.content;
      }
    } , 0)
  }

  options : boolean = false


  showOptions = (e : any) => {
    e && e.preventDefault()
    this.options = true
  }

  hideOptions = () => {
    this.options = false
  } 

  handlePaste = (e : any) => {
    e.preventDefault()
    const text = e.clipboardData.getData("text/plain")
    const c = document.getElementById(`element${this.i}`)
    //console.log(c)
    document.execCommand("insertHTML" , false , text )
  }
  
  handleChange = (e : any) => {
    let content
    setTimeout(() => {
      content = e.target.textContent
      this.update.emit({id : this.i , value : content.toLocaleString()})
    } , 0)
  }

}