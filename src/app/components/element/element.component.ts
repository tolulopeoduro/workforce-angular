import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';


@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss']
})

export class ElementComponent implements OnInit {

  constructor() { 
    this.update = new EventEmitter<any>();
    this.append = new EventEmitter<any>();
    this.clear = new EventEmitter<any>();
  }

  @Output() update : EventEmitter<any>;
  @Output() append : EventEmitter<any>;
  @Output() clear : EventEmitter<any>;
  @ViewChild('myInput') inputText : any;
  @Input() element : any = null;
  @Input() i : any = null;
  @Input() editing : boolean = false;
  caretPos : any = 0
  
  

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
    const c = document.getElementById(`element${this.i}`)
    if (window.getSelection()) {
      this.caretPos = window.getSelection()?.focusOffset
    }
    e && e.preventDefault()
    this.options = true;
  }

  hideOptions = () => {
    this.options = false
    setTimeout(() => {
      const c = document.getElementById(`element${this.i}`)
      if (c) {
        c.focus()
      }
    } , 100)
  } 

  handlePaste = (e : any) => {
    e.preventDefault()
    const text = e.clipboardData.getData("text/plain")
    const c = document.getElementById(`element${this.i}`)
  }
  
  handleChange = (e : any) => {
    
    if (e.code === 'Enter') {
      const p = document.getSelection()?.focusOffset
      const ar = this.element.content.split('')
      if (p) {
        const ar2 = ar.splice(p , ar.length)
        setTimeout(() => {
          this.append.emit({id : this.i , type : this.element.type , current : ar2.join('') , added : ar.join('')})
          this.element.content = ar2.join('')
          e.target.textContent = ar2.join('')
          
        } , 0)
      }
    }
    if (e.code === "Backspace" && document.getSelection()?.focusOffset === 0) {
        this.clear.emit({id : this.i , current : this.element.content})
    }
    
    let content
    setTimeout(() => {
      content = e.target.textContent
      this.update.emit({id : this.i , value : content.toLocaleString()})
    } , 0)
  }
  
  modify = (e : any) => {
    
  }

}
