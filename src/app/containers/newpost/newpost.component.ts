import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.scss']
})
export class NewpostComponent implements OnInit {

  currentText : string = "<p>Hello</p>"

  readonly apiKey = "4zpxg60v03w6ryq4e084yzkbiogxu2icn46w1w0yzi458h0l"


  handleChange() {
    console.clear()
    console.log(this.currentText)
  }
  

  pick(){
    console.log("hello")
  }

  constructor() { }

  ngOnInit(): void {
  }

}
