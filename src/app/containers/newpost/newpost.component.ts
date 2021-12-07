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
    if (this.router.url.split('/').pop() === 'edit') {
      this.isUpdate = true
      this.http.getRequest(`${environment.apiUrl}/post/${this.router.url.split("/")[2]}`)
      .subscribe(res => {
        this.loading = true
        this.postData = res.data[0]
        console.log(this.postData)
        this.title = res.data[0].title
        this.elements = res.data[0].content;
        this.loading = false
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
    }
  }

  constructor (private http : HttpService , private router : Router) {

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
      console.log(res)
      this.router.navigate([`/post/${this.postData.id}`])
    })
  }

}
