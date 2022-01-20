import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ElementComponent } from 'src/app/components/element/element.component';
import { HttpService } from 'src/app/services/http/http.service';
import { environment } from 'src/environments/environment';
import * as $ from 'jquery'


@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.scss']
})
export class NewpostComponent implements OnInit {

 

  ngOnInit(): void {
    if (this.router.url.split('/').pop() === 'edit') {
      this.isUpdate = true
      this.http.getRequest(`${environment.apiUrl}/post/${this.router.url.split("/")[2]}`)
      .subscribe(res => {
        this.loading = true
        this.postData = res.data[0]
        this.title = res.data[0].title
        this.elements = res.data[0].content;
        this.loading = false
        this.titleService.setTitle(`Editor - ${res.data[0].title}`)
      }) 
    } else {
      this.elements = [
        {
          type : "paragraph",
          content : "",
          class : ""
        },
      ];
      this.loading = false
      this.titleService.setTitle('Editor')
    }
  }

  constructor (private http : HttpService , private router : Router , private titleService : Title ) {

  }

  @ViewChild(ElementComponent)

  editing : boolean = false;
  options : boolean = false;
  newElementOpt : boolean = false;
  title : string = ""
  postData : any = null;
  isUpdate : boolean = false;
  loading : boolean = true;
  elements : any = null;

  

  toggle = () => {
    this.newElementOpt === true ? this.newElementOpt = false : this.newElementOpt = true
  }

  add = (type : string , content : string) => {
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
      userId : localStorage.getItem("id"),
      content : this.elements,
      date : new Date().toLocaleDateString()
    }
    
    this.http.postRequest(`${environment.apiUrl}/post` , data , {headers : {'Authorization' : `${localStorage.getItem('token')}`}}).subscribe(res => {
      this.router.navigate(['/'])
    })
  }

  updatePost = () => {
    const data = {
      id : this.postData._id,
      title : this.title,
      author : localStorage.getItem("id"),
      content : this.elements,
      updated : new Date().toLocaleDateString
    }
    this.http.putRequest(`${environment.apiUrl}/post/${data.id}` , data , {}).subscribe(res => {
      this.router.navigate([`/post/${this.postData._id}`])
    })
  }

  delete = (data : any) => {
    const {id} = data
    const content1 = this.elements[id-1].content
    const content2 = this.elements[id].content
    if (id > 0) {
      const type = this.elements[id-1].type
      this.elements.splice(id - 1 , 2 , {
        type : type,
        content : content1+content2,
        class : ''
      })
    }
    setTimeout(() => {
      const el =document.getElementById(`element${id - 1}`)
      if (el) {
        el.textContent = content1+content2
        el.focus()
        window.getSelection()?.setPosition(el.childNodes[0] , content1.length)
      }
    } , 0)
  }

  addNew = (data : any) => {
    const {id , type , current , added} = data
    const el =document.getElementById(`element${id}`)
    el?.focus()
    this.elements.splice(id , 0 , {
      type : type,
      content : added,
      class : ''
    })
  }

}
