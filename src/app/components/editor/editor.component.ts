import { Component, OnInit } from '@angular/core';
import EditorJs from '@editorjs/editorjs'
import {editorConfig} from './editorconfig'
import { HttpService } from 'src/app/services/http/http.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  editor : any
  title : any
  isUpdate : boolean
  loading : boolean = false
  data : any
  postData : any 
  moreOptions : boolean = false
  preview_title : any = ""
  preview_subtitle : string = ""


  constructor(private http : HttpService , private router : Router) { }

  setupWithData = (data) => {
    setTimeout(() => {
      this.editor = new EditorJs({
        ...editorConfig,
        data : (data)
      })
    } , 1000)
  }
  
  setupWithoutData = () => {
    setTimeout(() => {
      this.editor = new EditorJs({
        ...editorConfig,
      })
    } , 1000)
  }
  
  checkIfNew = () => {
    if (this.router.url.split('/').pop() === 'edit') {
      this.isUpdate = true
      this.http.getRequest(`${environment.apiUrl}/post/${this.router.url.split("/")[2]}`)
      .subscribe(res => {
        this.loading = true
        this.title = res.data[0].title
        this.postData = res.data[0]
        this.preview_title = this.postData.preview.title
        this.preview_subtitle = this.postData.preview.subtitle
        this.setupWithData(this.postData.content)
        
      })
    } else {
      this.isUpdate = false
      this.setupWithoutData()
    }
  }
  
  ngOnInit(): void {
    this.checkIfNew()
  }
  
  createPost = () => {
    const data = {
      title : this.title,
      userId : localStorage.getItem("id"),
      content : this.data,
      date : new Date().toLocaleDateString(),
      preview : {
        title : this.preview_title,
        subtitle : this.preview_subtitle
      }
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
      content : this.data,
      updated : new Date().toLocaleDateString,
      preview : {
        title : this.preview_title,
        subtitle : this.preview_subtitle
      }
    }
    this.http.putRequest(`${environment.apiUrl}/post/${data.id}` , data , {}).subscribe(res => {
      
      this.router.navigate([`/post/${this.postData.id}`])
    })
  }
  
  publish = () => {
    this.editor.save().then((outputData) => {
      
      this.data = outputData

      if (this.isUpdate) {
        this.updatePost()
      } else {
        this.createPost()
      }

    }).catch((error) => {
      
    });

  }

  showOptions = () => this.moreOptions = true
  hideOptions = () => this.moreOptions = false

}
