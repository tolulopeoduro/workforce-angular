import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ElementComponent } from 'src/app/components/element/element.component';
import { HttpService } from 'src/app/services/http/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.scss']
})
export class NewpostComponent implements OnInit {

  ngOnInit(): void {
  }

  constructor (private http : HttpService , private router : Router) {

  }

  @ViewChild(ElementComponent)

  editing : boolean = false;
  options : boolean = false;
  newElementOpt : boolean = false;
  title : string = ""


  elements = [
    {
      type : "paragraph",
      content : "",
      class : ""
    },
  ];

  toggle = () => {
    this.newElementOpt === true ? this.newElementOpt = false : this.newElementOpt = true
    console.log(this.elements[0].content)
  }

  add = (type : string) => {
    const data = {
      id : this.elements.length,
      type : type,
      content : "",
      class : ""
    }
    const ar = [...this.elements , data]
    this.elements =ar
    this.newElementOpt = false
  }

  showAtt = () => this.options = true

  update = (data :any) => {
    this.elements[data.id].content = data.value
  }

  createPost = () => {
    const data = {
      title : this.title,
      author : localStorage.getItem("id"),
      content : this.elements,
      date : new Date().toLocaleDateString()
    }
    this.http.postRequest(`${environment.apiUrl}/post` , data , {}).subscribe(res => {
      this.router.navigate(['/'])
    })
  }

}
